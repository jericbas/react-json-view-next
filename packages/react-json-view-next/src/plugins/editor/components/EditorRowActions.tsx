import type React from 'react';
import { useSyncExternalStore } from 'react';
import { useJsonView } from '../../../context/JsonViewContext';
import type { RowActionContext, TypeDefaultValue } from '../../../types';
import { executeAddArrayItem, executeDeleteObject, executeDeleteVariable } from '../mutations';
import type { EditorStore } from '../store';
import type { OnAddOption, OnDeleteOption, OnEditOption } from '../types';
import ObjectActionIcons from './ObjectActionIcons';
import VariableActionIcons from './VariableActionIcons';

export interface EditorRowActionsProps {
  store: EditorStore;
  context: RowActionContext;
  onEdit?: OnEditOption | undefined;
  onAdd?: OnAddOption | undefined;
  onDelete?: OnDeleteOption | undefined;
  defaultValue?: TypeDefaultValue | TypeDefaultValue[] | null | undefined;
}

export const EditorRowActions: React.FC<EditorRowActionsProps> = ({
  store,
  context,
  onEdit,
  onAdd,
  onDelete,
  defaultValue
}) => {
  const { dispatch, src } = useJsonView();
  useSyncExternalStore(store.subscribe, store.getState);
  const { variable, namespace, theme, hovered, depth } = context;

  const isEditing = store.isEditing(variable, namespace);
  const isContainer = variable.type === 'object' || variable.type === 'array';

  if (isContainer) {
    const handleStartAdd = () => {
      if (variable.type === 'object') {
        store.requestAddKey({
          existing_value: variable.value,
          namespace,
          name: depth > 0 ? (variable.name ?? null) : null,
          depth
        });
      } else {
        const { updatedSrc, isValid } = executeAddArrayItem({
          currentSrc: src,
          variable,
          namespace,
          depth,
          defaultValue,
          onAdd
        });
        if (!isValid) {
          store.setState({ validationFailure: true });
        } else {
          dispatch({ type: 'SRC_UPDATED', payload: updatedSrc });
          store.setState({ validationFailure: false });
        }
      }
    };

    const handleDelete = () => {
      const { updatedSrc, isValid } = executeDeleteObject({
        currentSrc: src,
        variable,
        namespace,
        depth,
        onDelete
      });
      if (!isValid) {
        store.setState({ validationFailure: true });
      } else {
        dispatch({ type: 'SRC_UPDATED', payload: updatedSrc });
        store.setState({ validationFailure: false });
      }
    };

    return (
      <ObjectActionIcons
        onAdd={onAdd !== undefined && onAdd !== false}
        onDelete={onDelete !== undefined && onDelete !== false}
        hovered={hovered}
        theme={theme}
        canDelete={namespace.length > 1}
        onStartAdd={handleStartAdd}
        onRemove={handleDelete}
      />
    );
  }

  const handleDeleteVariable = () => {
    const { updatedSrc, isValid } = executeDeleteVariable({
      currentSrc: src,
      variable,
      namespace,
      onDelete
    });
    if (!isValid) {
      store.setState({ validationFailure: true });
    } else {
      dispatch({ type: 'SRC_UPDATED', payload: updatedSrc });
      store.setState({ validationFailure: false });
    }
  };

  return (
    <VariableActionIcons
      onEdit={onEdit !== undefined && onEdit !== false}
      onDelete={onDelete !== undefined && onDelete !== false}
      editMode={isEditing}
      hovered={hovered}
      theme={theme}
      onStartEdit={() => store.startEdit(variable, namespace)}
      onRemove={handleDeleteVariable}
    />
  );
};

export default EditorRowActions;
