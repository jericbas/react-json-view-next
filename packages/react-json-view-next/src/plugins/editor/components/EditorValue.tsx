import type React from 'react';
import { useSyncExternalStore } from 'react';
import { useJsonView } from '../../../context/JsonViewContext';
import type { ValueRenderContext } from '../../../types';
import { executeEdit } from '../mutations';
import type { ParsedInput } from '../parseInput';
import type { EditorStore } from '../store';
import type { OnEditOption } from '../types';
import VariableEditInput from './VariableEditInput';

export interface EditorValueProps {
  store: EditorStore;
  context: ValueRenderContext;
  onEdit?: OnEditOption | undefined;
}

export const EditorValue: React.FC<EditorValueProps> = ({ store, context, onEdit }) => {
  const { dispatch, src } = useJsonView();
  const state = useSyncExternalStore(store.subscribe, store.getState);
  const { variable, namespace, theme, defaultRender } = context;

  const isEditing = store.isEditing(variable, namespace);
  if (!isEditing) {
    return <>{defaultRender()}</>;
  }

  const handleSubmit = (submitDetected = false) => {
    let newValue: any = state.editValue;
    if (submitDetected && state.parsedInput.type !== false) {
      newValue = state.parsedInput.value;
    }

    const { updatedSrc, isValid } = executeEdit({
      currentSrc: src,
      name: variable.name,
      namespace,
      existingValue: variable.value,
      newValue,
      onEdit
    });

    if (!isValid) {
      store.setState({ validationFailure: true, activeEdit: null });
    } else {
      dispatch({ type: 'SRC_UPDATED', payload: updatedSrc });
      store.setState({ validationFailure: false, activeEdit: null });
    }
  };

  return (
    <div onClick={e => e.stopPropagation()}>
      <VariableEditInput
        editValue={state.editValue}
        setEditValue={store.setEditValue}
        parsedInput={state.parsedInput}
        setParsedInput={(parsed: ParsedInput) => {
          store.setState({ parsedInput: parsed });
        }}
        theme={theme}
        namespace={namespace}
        onCancel={store.cancelEdit}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditorValue;
