import type React from 'react';
import AutosizeTextarea from '../../../components/AutosizeTextarea';
import { CheckCircle, RemoveCircle as Remove } from '../../../components/icons';
import type { ThemeKeys, ThemeObject } from '../../../types';
import type { ParsedInput } from '../parseInput';
import parseInput from '../parseInput';
import { getEditorStyle } from '../style';
import { DetectedInputPreview } from './DetectedInputPreview';

export interface VariableEditInputProps {
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

export const VariableEditInput: React.FC<VariableEditInputProps> = ({
  editValue,
  setEditValue,
  parsedInput,
  setParsedInput,
  theme,
  namespace,
  onCancel,
  onSubmit,
  ...restProps
}) => {
  return (
    <div>
      <AutosizeTextarea
        ref={input => {
          if (input) {
            input.focus();
          }
        }}
        value={editValue}
        className="variable-editor"
        onChange={event => {
          const val = event.target.value;
          const detected = parseInput(val);
          setEditValue(val);
          setParsedInput({
            type: detected.type,
            value: detected.value
          });
        }}
        onKeyDown={e => {
          switch (e.key) {
            case 'Escape': {
              onCancel();
              break;
            }
            case 'Enter': {
              if (e.ctrlKey || e.metaKey) {
                onSubmit(true);
              }
              break;
            }
          }
          e.stopPropagation();
        }}
        placeholder="update this value"
        minRows={2}
        style={getEditorStyle(theme, 'edit-input').style as any}
      />
      <div {...getEditorStyle(theme, 'edit-icon-container')}>
        <Remove
          className="edit-cancel"
          {...getEditorStyle(theme, 'cancel-icon')}
          onClick={onCancel}
        />
        <CheckCircle
          className="edit-check string-value"
          {...getEditorStyle(theme, 'check-icon')}
          onClick={() => onSubmit(false)}
        />
        <DetectedInputPreview
          parsedInput={parsedInput}
          theme={theme}
          namespace={namespace}
          onSubmit={() => onSubmit(true)}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default VariableEditInput;
