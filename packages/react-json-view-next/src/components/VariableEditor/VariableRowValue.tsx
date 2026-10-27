import type React from 'react';
import type { ParsedInput } from '../../helpers/parseInput';
import type { ThemeKeys, ThemeObject } from '../../types';
import {
  JsonBoolean,
  JsonDate,
  JsonFloat,
  JsonFunction,
  JsonInteger,
  JsonNan,
  JsonNull,
  JsonRegexp,
  JsonString,
  JsonUndefined
} from '../DataTypes/DataTypes';
import type { JsonVariable } from '../VariableEditor';
import { VariableEditInput } from './VariableEditInput';

export interface VariableRowValueProps {
  variable: JsonVariable;
  editMode: boolean;
  editValue: string;
  setEditValue: (val: string) => void;
  parsedInput: ParsedInput;
  setParsedInput: (parsed: ParsedInput) => void;
  theme: ThemeKeys | ThemeObject;
  namespace: Array<string | number | null>;
  onCancel: () => void;
  onSubmit: (submitDetected?: boolean) => void;
  [key: string]: any;
}

export const VariableRowValue: React.FC<VariableRowValueProps> = props => {
  const {
    variable,
    editMode,
    editValue,
    setEditValue,
    parsedInput,
    setParsedInput,
    theme,
    namespace,
    onCancel,
    onSubmit,
    ...restProps
  } = props;

  if (editMode) {
    return (
      <VariableEditInput
        editValue={editValue}
        setEditValue={setEditValue}
        parsedInput={parsedInput}
        setParsedInput={setParsedInput}
        theme={theme}
        namespace={namespace}
        onCancel={onCancel}
        onSubmit={onSubmit}
        {...restProps}
      />
    );
  }

  switch (variable.type) {
    case 'string':
      return (
        <JsonString value={variable.value} theme={theme} namespace={namespace} {...restProps} />
      );
    case 'integer':
      return <JsonInteger value={variable.value} theme={theme} {...restProps} />;
    case 'float':
      return <JsonFloat value={variable.value} theme={theme} {...restProps} />;
    case 'boolean':
      return <JsonBoolean value={variable.value} theme={theme} {...restProps} />;
    case 'function':
      return (
        <JsonFunction value={variable.value} theme={theme} namespace={namespace} {...restProps} />
      );
    case 'null':
      return <JsonNull theme={theme} {...restProps} />;
    case 'nan':
      return <JsonNan theme={theme} {...restProps} />;
    case 'undefined':
      return <JsonUndefined theme={theme} {...restProps} />;
    case 'date':
      return <JsonDate value={variable.value} theme={theme} {...restProps} />;
    case 'regexp':
      return <JsonRegexp value={variable.value} theme={theme} {...restProps} />;
    default:
      return <div className="object-value">{JSON.stringify(variable.value)}</div>;
  }
};
