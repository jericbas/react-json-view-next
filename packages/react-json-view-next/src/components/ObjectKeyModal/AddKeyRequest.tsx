import type React from 'react';
import { use } from 'react';
import { JsonViewContext } from '../../context/JsonViewContext';
import type { ThemeKeys, ThemeObject, TypeDefaultValue } from '../../types';
import ObjectKeyModal from './ObjectKeyModal';

export interface AddKeyRequestProps {
  active?: boolean;
  theme?: ThemeKeys | ThemeObject;
  rjvId?: string;
  defaultValue?: TypeDefaultValue | TypeDefaultValue[] | null;
}

export const AddKeyRequest: React.FC<AddKeyRequestProps> = ({
  active: activeProp,
  theme: themeProp,
  defaultValue = null
}) => {
  const { addKeyRequest, theme: contextTheme, dispatch } = use(JsonViewContext);
  const active = activeProp ?? Boolean(addKeyRequest);
  const theme = themeProp ?? contextTheme;

  if (!active) {
    return null;
  }

  const isValid = (input: string): boolean => {
    return (
      input !== '' &&
      addKeyRequest !== null &&
      addKeyRequest.existing_value !== undefined &&
      Object.keys(addKeyRequest.existing_value).indexOf(input) === -1
    );
  };

  const submit = (input: string): void => {
    if (addKeyRequest) {
      const request = {
        ...addKeyRequest,
        new_value: {
          ...addKeyRequest.existing_value,
          [input]: defaultValue
        }
      };
      dispatch({
        type: 'VARIABLE_ADDED',
        payload: request
      });
    }
  };

  return <ObjectKeyModal theme={theme} isValid={isValid} submit={submit} />;
};

export default AddKeyRequest;
