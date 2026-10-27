import type React from 'react';
import { use, useState } from 'react';
import { JsonViewContext } from '../context/JsonViewContext';
import type { ParsedInput } from '../helpers/parseInput';
import parseInput from '../helpers/parseInput';
import stringifyVariable from '../helpers/stringifyVariable';
import Theme from '../themes/getStyle';
import type { OnCopyProps, OnSelectProps, ThemeKeys, ThemeObject } from '../types';
import CopyToClipboard from './CopyToClipboard';
import { VariableActionIcons } from './VariableEditor/VariableActionIcons';
import { VariableKeyLabel } from './VariableEditor/VariableKeyLabel';
import { VariableRowValue } from './VariableEditor/VariableRowValue';

export interface JsonVariable {
  name: string | number;
  value: any;
  type: string;
}

export interface VariableEditorProps {
  variable: JsonVariable;
  singleIndent: number;
  type?: string | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  namespace: Array<string | number | null>;
  indentWidth?: number | undefined;
  enableClipboard?: boolean | ((copy: OnCopyProps) => void) | undefined;
  onEdit?: ((edit: any) => false | unknown) | false | undefined;
  onDelete?: ((del: any) => false | unknown) | false | undefined;
  onSelect?: ((select: OnSelectProps) => void) | false | undefined;
  displayArrayKey?: boolean | undefined;
  quotesOnKeys?: boolean | undefined;
  rjvId?: string | undefined;
  collapseStringsAfterLength?: number | false | undefined;
  displayDataTypes?: boolean | undefined;
}

export const VariableEditor: React.FC<VariableEditorProps> = props => {
  const { dispatch, theme: contextTheme } = use(JsonViewContext);
  const {
    variable,
    singleIndent,
    type,
    theme = contextTheme || 'rjv-default',
    namespace,
    indentWidth = 4,
    enableClipboard = true,
    onEdit = false,
    onDelete = false,
    onSelect = false,
    displayArrayKey = true,
    quotesOnKeys = true
  } = props;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>('');
  const [hovered, setHovered] = useState<boolean>(false);
  const [parsedInput, setParsedInput] = useState<ParsedInput>({
    type: false,
    value: null
  });

  const prepopInput = (v: JsonVariable) => {
    if (onEdit !== false) {
      const stringifiedValue = stringifyVariable(v.value);
      const detected = parseInput(stringifiedValue);
      setEditMode(true);
      setEditValue(stringifiedValue);
      setParsedInput({
        type: detected.type,
        value: detected.value
      });
    }
  };

  const submitEdit = (submit_detected = false) => {
    let new_value: any = editValue;
    if (submit_detected && parsedInput.type) {
      new_value = parsedInput.value;
    }
    setEditMode(false);
    dispatch({
      type: 'VARIABLE_UPDATED',
      payload: {
        name: variable.name,
        namespace: namespace,
        existing_value: variable.value,
        new_value: new_value,
        variable_removed: false
      }
    });
  };

  return (
    <div
      {...Theme(theme, 'objectKeyVal', {
        paddingLeft: indentWidth * singleIndent
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="variable-row"
      key={String(variable.name)}
    >
      <VariableKeyLabel
        type={type}
        displayArrayKey={displayArrayKey}
        theme={theme}
        variable={variable}
        namespace={namespace}
        quotesOnKeys={quotesOnKeys}
      />
      <div
        className="variable-value"
        onClick={
          onSelect === false && onEdit === false
            ? undefined
            : e => {
                const location = [...namespace];
                if ((e.ctrlKey || e.metaKey) && onEdit !== false) {
                  prepopInput(variable);
                } else if (onSelect !== false) {
                  location.shift();
                  onSelect({
                    name: String(variable.name),
                    value: variable.value,
                    type: variable.type,
                    namespace: location
                  });
                }
              }
        }
        {...Theme(theme, 'variableValue', {
          cursor: onSelect === false ? 'default' : 'pointer'
        })}
      >
        <VariableRowValue
          {...props}
          variable={variable}
          editMode={editMode}
          editValue={editValue}
          setEditValue={setEditValue}
          parsedInput={parsedInput}
          setParsedInput={setParsedInput}
          theme={theme}
          namespace={namespace}
          onCancel={() => {
            setEditMode(false);
            setEditValue('');
          }}
          onSubmit={submitEdit}
        />
      </div>
      {enableClipboard ? (
        <CopyToClipboard
          rowHovered={hovered}
          hidden={editMode}
          src={variable.value}
          clickCallback={enableClipboard}
          theme={theme}
          namespace={[...namespace, variable.name]}
        />
      ) : null}
      <VariableActionIcons
        onEdit={onEdit !== false}
        onDelete={onDelete !== false}
        editMode={editMode}
        hovered={hovered}
        theme={theme}
        onStartEdit={() => prepopInput(variable)}
        onRemove={() => {
          dispatch({
            type: 'VARIABLE_REMOVED',
            payload: {
              name: variable.name,
              namespace: namespace,
              existing_value: variable.value,
              variable_removed: true
            }
          });
        }}
      />
    </div>
  );
};

export default VariableEditor;
