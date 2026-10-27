import { useCallback, useEffect, useId, useMemo, useReducer, useRef } from 'react';
import type { JsonViewAction, JsonViewContextValue } from '../context/JsonViewContext';
import { jsonViewReducer } from '../context/JsonViewContext';
import { updateSrc } from '../helpers/updateSrc';
import { validateProps } from '../helpers/validateProps';
import type { InteractionProps, ReactJsonViewProps } from '../types';

export function useJsonViewContainer(
  props: ReactJsonViewProps,
  resolvedSrc: any
): {
  rjvId: string;
  contextValue: JsonViewContextValue;
  theme: any;
} {
  const {
    name: nameProp = 'root',
    theme: themeProp = 'rjv-default',
    validationMessage: validationMessageProp = 'Validation Error',
    onEdit = false,
    onDelete = false,
    onAdd = false
  } = props;

  const rawId = useId();
  const rjvId = rawId.replace(/:/g, '') || 'rjv';

  const validated = validateProps(resolvedSrc, nameProp, themeProp, validationMessageProp);

  const [state, reducerDispatch] = useReducer(jsonViewReducer, {
    src: validated.src,
    name: validated.name,
    theme: validated.theme,
    validationMessage: validated.validationMessage,
    addKeyRequest: null,
    validationFailure: false,
    expanded: {},
    collapsed: {},
    plugins: [],
    rjvId
  });

  const prevPropsRef = useRef({
    src: resolvedSrc,
    name: nameProp,
    theme: themeProp,
    validationMessage: validationMessageProp
  });

  useEffect(() => {
    if (
      resolvedSrc !== prevPropsRef.current.src ||
      nameProp !== prevPropsRef.current.name ||
      themeProp !== prevPropsRef.current.theme ||
      validationMessageProp !== prevPropsRef.current.validationMessage
    ) {
      prevPropsRef.current = {
        src: resolvedSrc,
        name: nameProp,
        theme: themeProp,
        validationMessage: validationMessageProp
      };
      const updated = validateProps(resolvedSrc, nameProp, themeProp, validationMessageProp);
      reducerDispatch({
        type: 'RESET_PROPS',
        payload: updated
      });
    }
  }, [resolvedSrc, nameProp, themeProp, validationMessageProp]);

  const callbacksRef = useRef({
    onAdd,
    onEdit,
    onDelete,
    src: state.src
  });
  callbacksRef.current = {
    onAdd,
    onEdit,
    onDelete,
    src: state.src
  };

  const dispatch = useCallback(
    (action: JsonViewAction) => {
      const actionType = action.type || (action as any).name;
      const actionData = action.payload !== undefined ? action.payload : (action as any).data;

      if (
        actionType === 'VARIABLE_UPDATED' ||
        actionType === 'VARIABLE_ADDED' ||
        actionType === 'VARIABLE_REMOVED'
      ) {
        const updated_src = updateSrc(state.src, actionData);
        const { onAdd: cbAdd, onEdit: cbEdit, onDelete: cbDelete } = callbacksRef.current;
        let callback: any;
        if (actionType === 'VARIABLE_ADDED') callback = cbAdd;
        else if (actionType === 'VARIABLE_UPDATED') callback = cbEdit;
        else if (actionType === 'VARIABLE_REMOVED') callback = cbDelete;

        const on_edit_payload: InteractionProps = {
          existing_src: state.src,
          new_value: actionData.new_value,
          updated_src: updated_src,
          name: actionData.name,
          namespace: actionData.namespace,
          existing_value: actionData.existing_value
        };

        const result = typeof callback === 'function' ? callback(on_edit_payload) : undefined;
        if (result === false) {
          reducerDispatch({ type: 'VALIDATION_FAILURE' });
        } else {
          reducerDispatch({
            type: 'SRC_UPDATED',
            payload: updated_src
          });
        }
      } else {
        reducerDispatch(action);
      }
    },
    [state.src]
  );

  const setExpanded = useCallback((key: string, expanded: boolean) => {
    reducerDispatch({ type: 'SET_EXPANDED', payload: { key, expanded } });
  }, []);

  const toggleExpanded = useCallback((key: string, defaultExpanded?: boolean) => {
    reducerDispatch({ type: 'TOGGLE_EXPANDED', payload: { key, defaultExpanded } });
  }, []);

  const setCollapsed = useCallback((key: string, collapsed: boolean) => {
    reducerDispatch({ type: 'SET_COLLAPSED', payload: { key, collapsed } });
  }, []);

  const toggleCollapsed = useCallback((key: string) => {
    reducerDispatch({ type: 'TOGGLE_COLLAPSED', payload: { key } });
  }, []);

  const contextValue = useMemo<JsonViewContextValue>(
    () => ({
      rjvId,
      src: state.src,
      name: state.name,
      theme: state.theme,
      validationMessage: state.validationMessage,
      addKeyRequest: state.addKeyRequest,
      validationFailure: state.validationFailure,
      expanded: state.expanded,
      collapsed: state.collapsed,
      plugins: [],
      dispatch,
      setExpanded,
      toggleExpanded,
      setCollapsed,
      toggleCollapsed
    }),
    [
      rjvId,
      state.src,
      state.name,
      state.theme,
      state.validationMessage,
      state.addKeyRequest,
      state.validationFailure,
      state.expanded,
      state.collapsed,
      dispatch,
      setExpanded,
      toggleExpanded,
      setCollapsed,
      toggleCollapsed
    ]
  );

  return { rjvId, contextValue, theme: state.theme };
}
