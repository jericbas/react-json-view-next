import React from 'react';
import type {
  JsonViewPlugin,
  RowActionContext,
  ValueClickContext,
  ValueRenderContext
} from '../../types';
import type { JsonVariable } from '../../types/variable';
import AddKeyRequest from './components/AddKeyRequest';
import DetectedInputPreview from './components/DetectedInputPreview';
import EditorOverlay from './components/EditorOverlay';
import EditorRowActions from './components/EditorRowActions';
import EditorValue from './components/EditorValue';
import ObjectActionIcons from './components/ObjectActionIcons';
import ObjectKeyModal from './components/ObjectKeyModal';
import ValidationFailure from './components/ValidationFailure';
import VariableActionIcons from './components/VariableActionIcons';
import VariableEditInput from './components/VariableEditInput';
import parseInput, { type ParsedInput } from './parseInput';
import EditorStore, { getRowKey } from './store';
import stringifyVariable from './stringifyVariable';
import { getEditorStyle, getEditorStylesMap, resolveEditorTheme } from './style';
import type {
  ActiveEditState,
  AddKeyRequestState,
  EditorPluginOptions,
  EditorState,
  InteractionProps,
  OnAddHandler,
  OnAddOption,
  OnDeleteHandler,
  OnDeleteOption,
  OnEditHandler,
  OnEditOption
} from './types';
import updateSrc, { deepCopy } from './updateSrc';

export function withEditor(options: EditorPluginOptions = {}): JsonViewPlugin {
  const store = new EditorStore(options.validationMessage);

  return {
    name: 'editor',
    renderRowActions: (ctx: RowActionContext) =>
      React.createElement(EditorRowActions, {
        store,
        context: ctx,
        onEdit: options.onEdit,
        onAdd: options.onAdd,
        onDelete: options.onDelete,
        defaultValue: options.defaultValue
      }),
    renderValue: (ctx: ValueRenderContext) =>
      React.createElement(EditorValue, {
        store,
        context: ctx,
        onEdit: options.onEdit
      }),
    renderRootOverlay: (ctx: any) =>
      React.createElement(EditorOverlay, {
        store,
        theme: ctx.theme,
        defaultValue: options.defaultValue,
        onAdd: options.onAdd
      }),
    onValueClick: (ctx: ValueClickContext) => {
      const isEditEnabled = options.onEdit !== false && options.onEdit !== undefined;
      if ((ctx.event.ctrlKey || ctx.event.metaKey) && isEditEnabled) {
        ctx.event.preventDefault();
        ctx.event.stopPropagation();
        store.startEdit(ctx.variable, ctx.namespace);
        return true;
      }
      return false;
    },
    isEditing: (variable: JsonVariable, namespace: Array<string | number | null>) =>
      store.isEditing(variable, namespace),
    subscribe: store.subscribe
  } as JsonViewPlugin;
}

export function withEdit(
  onEdit: OnEditOption,
  options: Partial<EditorPluginOptions> = {}
): JsonViewPlugin {
  return withEditor({
    ...options,
    onEdit,
    onAdd: options.onAdd ?? false,
    onDelete: options.onDelete ?? false
  });
}

export function withAdd(
  onAdd: OnAddOption,
  options: Partial<EditorPluginOptions> = {}
): JsonViewPlugin {
  return withEditor({
    ...options,
    onAdd,
    onEdit: options.onEdit ?? false,
    onDelete: options.onDelete ?? false
  });
}

export function withDelete(
  onDelete: OnDeleteOption,
  options: Partial<EditorPluginOptions> = {}
): JsonViewPlugin {
  return withEditor({
    ...options,
    onDelete,
    onEdit: options.onEdit ?? false,
    onAdd: options.onAdd ?? false
  });
}

export type {
  ActiveEditState,
  AddKeyRequestState,
  EditorPluginOptions,
  EditorState,
  InteractionProps,
  OnAddHandler,
  OnAddOption,
  OnDeleteHandler,
  OnDeleteOption,
  OnEditHandler,
  OnEditOption,
  ParsedInput
};
export {
  AddKeyRequest,
  DetectedInputPreview,
  deepCopy,
  EditorOverlay,
  EditorRowActions,
  EditorStore,
  EditorValue,
  getEditorStyle,
  getEditorStylesMap,
  getRowKey,
  ObjectActionIcons,
  ObjectKeyModal,
  parseInput,
  resolveEditorTheme,
  stringifyVariable,
  updateSrc,
  ValidationFailure,
  VariableActionIcons,
  VariableEditInput
};

export default withEditor;
