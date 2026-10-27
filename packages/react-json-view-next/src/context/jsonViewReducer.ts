import { updateSrc } from '../helpers/updateSrc';
import type { JsonViewAction, JsonViewState } from './JsonViewContext';

export function jsonViewReducer(state: JsonViewState, action: JsonViewAction): JsonViewState {
  const actionType = action.type || (action as any).name;
  const actionData = action.payload !== undefined ? action.payload : (action as any).data;

  switch (actionType) {
    case 'VARIABLE_UPDATED':
    case 'VARIABLE_ADDED':
    case 'VARIABLE_REMOVED': {
      if (!actionData) return state;
      const updated_src = updateSrc(state.src, actionData);
      return {
        ...state,
        src: updated_src,
        validationFailure: false,
        addKeyRequest: null
      };
    }
    case 'SRC_UPDATED': {
      return {
        ...state,
        src: actionData,
        validationFailure: false,
        addKeyRequest: null
      };
    }
    case 'ADD_VARIABLE_KEY_REQUEST': {
      return {
        ...state,
        addKeyRequest: actionData
      };
    }
    case 'RESET': {
      return {
        ...state,
        validationFailure: false,
        addKeyRequest: null
      };
    }
    case 'VALIDATION_FAILURE': {
      return {
        ...state,
        validationFailure: true
      };
    }
    case 'SET_EXPANDED': {
      if (!actionData) return state;
      return {
        ...state,
        expanded: {
          ...state.expanded,
          [actionData.key]: actionData.expanded
        }
      };
    }
    case 'TOGGLE_EXPANDED': {
      if (!actionData) return state;
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
    case 'SET_COLLAPSED': {
      if (!actionData) return state;
      return {
        ...state,
        collapsed: {
          ...state.collapsed,
          [actionData.key]: actionData.collapsed
        }
      };
    }
    case 'TOGGLE_COLLAPSED': {
      if (!actionData) return state;
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
    case 'RESET_PROPS': {
      if (!actionData) return state;
      return {
        ...state,
        src: actionData.src !== undefined ? actionData.src : state.src,
        name: actionData.name !== undefined ? actionData.name : state.name,
        theme: actionData.theme !== undefined ? actionData.theme : state.theme,
        validationMessage:
          actionData.validationMessage !== undefined
            ? actionData.validationMessage
            : state.validationMessage
      };
    }
    default:
      return state;
  }
}
