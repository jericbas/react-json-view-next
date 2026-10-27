import type React from 'react';
import type { ThemeKeys, ThemeObject, TypeDefaultValue } from '../../../types';
import ObjectKeyModal from './ObjectKeyModal';

export interface AddKeyRequestPayload {
  existing_value: any;
  namespace: Array<string | number | null>;
  name: string | number | null;
  depth?: number | undefined;
}

export interface AddKeyRequestProps {
  active?: boolean | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  rjvId?: string | undefined;
  defaultValue?: TypeDefaultValue | TypeDefaultValue[] | null | undefined;
  addKeyRequest?: AddKeyRequestPayload | null | undefined;
  onSubmit?: ((keyName: string) => void) | undefined;
  onCancel?: (() => void) | undefined;
}

export const AddKeyRequest: React.FC<AddKeyRequestProps> = ({
  active = false,
  theme = 'rjv-default',
  addKeyRequest,
  onSubmit,
  onCancel
}) => {
  if (!active || !addKeyRequest) {
    return null;
  }

  const isValid = (input: string): boolean => {
    return (
      input !== '' &&
      addKeyRequest.existing_value !== undefined &&
      addKeyRequest.existing_value !== null &&
      Object.keys(addKeyRequest.existing_value).indexOf(input) === -1
    );
  };

  const submit = (input: string): void => {
    if (onSubmit) {
      onSubmit(input);
    }
  };

  return <ObjectKeyModal theme={theme} isValid={isValid} submit={submit} onClose={onCancel} />;
};

export default AddKeyRequest;
