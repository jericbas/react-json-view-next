import type React from 'react';
import type { ParsedInput } from '../../helpers/parseInput';
import parseInput from '../../helpers/parseInput';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import AutosizeTextarea from '../AutosizeTextarea';
import { CheckCircle, RemoveCircle as Remove } from '../icons';
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
        style={Theme(theme, 'edit-input').style as any}
      />
      <div {...Theme(theme, 'edit-icon-container')}>
        <Remove className="edit-cancel" {...Theme(theme, 'cancel-icon')} onClick={onCancel} />
        <CheckCircle
          className="edit-check string-value"
          {...Theme(theme, 'check-icon')}
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
