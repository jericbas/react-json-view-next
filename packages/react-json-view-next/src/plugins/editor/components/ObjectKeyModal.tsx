import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Add as Cancel, CheckCircle } from '../../../components/icons';
import type { ThemeKeys, ThemeObject } from '../../../types';
import { getEditorStyle } from '../style';

export interface ObjectKeyModalProps {
  theme?: ThemeKeys | ThemeObject | undefined;
  rjvId?: string | undefined;
  isValid: (input: string) => boolean;
  submit: (input: string) => void;
  onClose?: (() => void) | undefined;
  input?: string | undefined;
}

export const ObjectKeyModal: React.FC<ObjectKeyModalProps> = ({
  theme = 'rjv-default',
  isValid,
  submit,
  onClose,
  input: initialInput = ''
}) => {
  const [input, setInput] = useState<string>(initialInput);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const valid = isValid(input);

  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (valid) {
      submit(input);
    }
  };

  return (
    <div
      className="key-modal-request"
      {...getEditorStyle(theme, 'key-modal-request')}
      onClick={closeModal}
    >
      <div
        {...getEditorStyle(theme, 'key-modal')}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div {...getEditorStyle(theme, 'key-modal-label')}>Key Name:</div>
        <div style={{ position: 'relative' }}>
          <input
            {...getEditorStyle(theme, 'key-modal-input')}
            className="key-modal-input"
            ref={inputRef}
            spellCheck={false}
            value={input}
            placeholder="..."
            onChange={e => {
              setInput(e.target.value);
            }}
            onKeyDown={e => {
              if (valid && e.key === 'Enter') {
                handleSubmit();
              } else if (e.key === 'Escape') {
                closeModal();
              }
            }}
          />
          {valid ? (
            <CheckCircle
              {...getEditorStyle(theme, 'key-modal-submit')}
              className="key-modal-submit"
              onClick={handleSubmit}
            />
          ) : null}
        </div>
        <span {...getEditorStyle(theme, 'key-modal-cancel')}>
          <Cancel
            {...getEditorStyle(theme, 'key-modal-cancel-icon')}
            className="key-modal-cancel"
            onClick={closeModal}
          />
        </span>
      </div>
    </div>
  );
};

export default ObjectKeyModal;
