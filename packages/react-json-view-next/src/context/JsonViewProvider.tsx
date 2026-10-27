import type React from 'react';
import { useCallback, useEffect, useId, useMemo, useReducer, useRef } from 'react';
import type { JsonViewPlugin, ThemeKeys, ThemeObject } from '../types';
import type { JsonViewContextValue } from './JsonViewContext';
import { JsonViewContext, jsonViewReducer } from './JsonViewContext';

export interface JsonViewProviderProps {
  src: any;
  name?: string | number | null | false;
  theme?: ThemeKeys | ThemeObject;
  plugins?: JsonViewPlugin[];
  rjvId?: string;
  children: React.ReactNode;
}

export const JsonViewProvider: React.FC<JsonViewProviderProps> = ({
  src,
  name = 'root',
  theme = 'rjv-default',
  plugins = [],
  rjvId: rjvIdProp,
  children
}) => {
  const generatedId = useId();
  const rjvId = rjvIdProp || generatedId.replace(/:/g, '') || 'rjv';

  const [state, dispatch] = useReducer(jsonViewReducer, {
    src,
    name,
    theme,
    expanded: {},
    collapsed: {},
    plugins,
    rjvId
  });

  const prevRef = useRef({ src, name, theme, plugins });
  useEffect(() => {
    if (
      src !== prevRef.current.src ||
      name !== prevRef.current.name ||
      theme !== prevRef.current.theme ||
      plugins !== prevRef.current.plugins
    ) {
      prevRef.current = { src, name, theme, plugins };
      dispatch({
        type: 'RESET_PROPS',
        payload: { src, name, theme, plugins }
      });
    }
  }, [src, name, theme, plugins]);

  const setExpanded = useCallback((key: string, expanded: boolean) => {
    dispatch({ type: 'SET_EXPANDED', payload: { key, expanded } });
  }, []);

  const toggleExpanded = useCallback((key: string, defaultExpanded?: boolean) => {
    dispatch({ type: 'TOGGLE_EXPANDED', payload: { key, defaultExpanded } });
  }, []);

  const setCollapsed = useCallback((key: string, collapsed: boolean) => {
    dispatch({ type: 'SET_COLLAPSED', payload: { key, collapsed } });
  }, []);

  const toggleCollapsed = useCallback((key: string) => {
    dispatch({ type: 'TOGGLE_COLLAPSED', payload: { key } });
  }, []);

  const contextValue = useMemo<JsonViewContextValue>(
    () => ({
      rjvId,
      src: state.src,
      name: state.name,
      theme: state.theme,
      expanded: state.expanded,
      collapsed: state.collapsed,
      plugins: state.plugins,
      setExpanded,
      toggleExpanded,
      setCollapsed,
      toggleCollapsed,
      dispatch
    }),
    [
      rjvId,
      state.src,
      state.name,
      state.theme,
      state.expanded,
      state.collapsed,
      state.plugins,
      setExpanded,
      toggleExpanded,
      setCollapsed,
      toggleCollapsed
    ]
  );

  return <JsonViewContext.Provider value={contextValue}>{children}</JsonViewContext.Provider>;
};

export default JsonViewProvider;
