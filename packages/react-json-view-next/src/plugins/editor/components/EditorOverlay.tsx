import type React from 'react';
import { useSyncExternalStore } from 'react';
import { useJsonView } from '../../../context/JsonViewContext';
import type { ThemeKeys, ThemeObject, TypeDefaultValue } from '../../../types';
import { executeAddKey } from '../mutations';
import type { EditorStore } from '../store';
import type { OnAddOption } from '../types';
import AddKeyRequest from './AddKeyRequest';
import ValidationFailure from './ValidationFailure';

export interface EditorOverlayProps {
  store: EditorStore;
  theme: ThemeKeys | ThemeObject;
  defaultValue?: TypeDefaultValue | TypeDefaultValue[] | null | undefined;
  onAdd?: OnAddOption | undefined;
}

export const EditorOverlay: React.FC<EditorOverlayProps> = ({
  store,
  theme,
  defaultValue,
  onAdd
}) => {
  const { dispatch, src } = useJsonView();
  const state = useSyncExternalStore(store.subscribe, store.getState);

  const handleAddKeySubmit = (keyName: string) => {
    if (!state.addKeyRequest) return;
    const { updatedSrc, isValid } = executeAddKey({
      currentSrc: src,
      addKeyRequest: state.addKeyRequest,
      keyName,
      defaultValue,
      onAdd
    });

    if (!isValid) {
      store.setState({ validationFailure: true, addKeyRequest: null });
    } else {
      dispatch({ type: 'SRC_UPDATED', payload: updatedSrc });
      store.setState({ validationFailure: false, addKeyRequest: null });
    }
  };

  return (
    <>
      <ValidationFailure
        active={state.validationFailure}
        message={state.validationMessage}
        theme={theme}
        onDismiss={store.dismissValidationFailure}
      />
      <AddKeyRequest
        active={Boolean(state.addKeyRequest)}
        theme={theme}
        defaultValue={defaultValue}
        addKeyRequest={state.addKeyRequest}
        onSubmit={handleAddKeySubmit}
        onCancel={store.cancelAddKey}
      />
    </>
  );
};

export default EditorOverlay;
