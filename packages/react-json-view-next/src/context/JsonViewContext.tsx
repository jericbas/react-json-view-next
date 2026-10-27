import { createContext, use } from 'react';
import type { JsonViewPlugin, ThemeKeys, ThemeObject } from '../types';

export interface JsonViewState {
  src: any;
  name: string | number | null | false;
  theme: ThemeKeys | ThemeObject;
  expanded: Record<string, boolean>;
  collapsed: Record<string, boolean>;
  plugins: JsonViewPlugin[];
  rjvId: string;
  addKeyRequest?: any;
  validationFailure?: boolean;
  validationMessage?: string;
  [key: string]: any;
}

export type JsonViewAction =
  | {
      type: 'SET_EXPANDED';
      payload: { key: string; expanded: boolean };
    }
  | {
      type: 'TOGGLE_EXPANDED';
      payload: { key: string; defaultExpanded?: boolean | undefined };
    }
  | {
      type: 'SET_COLLAPSED';
      payload: { key: string; collapsed: boolean };
    }
  | {
      type: 'TOGGLE_COLLAPSED';
      payload: { key: string };
    }
  | {
      type: 'RESET_PROPS';
      payload: Partial<JsonViewState>;
    }
  | {
      type: string;
      payload?: any;
      data?: any;
      [key: string]: any;
    };

export function jsonViewReducer(state: JsonViewState, action: JsonViewAction): JsonViewState {
  const actionType = action.type;
  const actionData =
    'payload' in action && action.payload !== undefined ? action.payload : (action as any).data;

  switch (actionType) {
    case 'SET_EXPANDED':
      return {
        ...state,
        expanded: {
          ...state.expanded,
          [actionData.key]: actionData.expanded
        }
      };
    case 'TOGGLE_EXPANDED': {
      const current =
        state.expanded[actionData.key] !== undefined
          ? state.expanded[actionData.key]
          : Boolean(actionData.defaultExpanded);
      return {
        ...state,
        expanded: {
          ...state.expanded,
          [actionData.key]: !current
        }
      };
    }
    case 'SET_COLLAPSED':
      return {
        ...state,
        collapsed: {
          ...state.collapsed,
          [actionData.key]: actionData.collapsed
        }
      };
    case 'TOGGLE_COLLAPSED': {
      const current =
        state.collapsed[actionData.key] !== undefined ? state.collapsed[actionData.key] : true;
      return {
        ...state,
        collapsed: {
          ...state.collapsed,
          [actionData.key]: !current
        }
      };
    }
    case 'RESET_PROPS':
      return {
        ...state,
        ...actionData
      };
    case 'SRC_UPDATED':
      return {
        ...state,
        src: actionData
      };
    default:
      return state;
  }
}

export interface JsonViewContextValue {
  rjvId: string;
  src: any;
  name: string | number | null | false;
  theme: ThemeKeys | ThemeObject;
  expanded: Record<string, boolean>;
  collapsed: Record<string, boolean>;
  plugins: JsonViewPlugin[];
  setExpanded: (key: string, expanded: boolean) => void;
  toggleExpanded: (key: string, defaultExpanded?: boolean) => void;
  setCollapsed: (key: string, collapsed: boolean) => void;
  toggleCollapsed: (key: string) => void;
  dispatch: (action: JsonViewAction) => void;
  addKeyRequest?: any;
  validationFailure?: boolean | undefined;
  validationMessage?: string | undefined;
  [key: string]: any;
}

export const defaultContextValue: JsonViewContextValue = {
  rjvId: '',
  src: {},
  name: 'root',
  theme: 'rjv-default',
  expanded: {},
  collapsed: {},
  plugins: [],
  setExpanded: () => {},
  toggleExpanded: () => {},
  setCollapsed: () => {},
  toggleCollapsed: () => {},
  dispatch: () => {},
  addKeyRequest: null,
  validationFailure: false,
  validationMessage: 'Validation Error'
};

export const JsonViewContext = createContext<JsonViewContextValue>(defaultContextValue);

export function useJsonView(): JsonViewContextValue {
  return use(JsonViewContext);
}
