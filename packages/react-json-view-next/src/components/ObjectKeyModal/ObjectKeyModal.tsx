import type React from 'react';
import { use, useEffect, useRef, useState } from 'react';
import { JsonViewContext } from '../../context/JsonViewContext';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import { Add as Cancel, CheckCircle } from '../icons';

export interface ObjectKeyModalProps {
  theme?: ThemeKeys | ThemeObject;
  rjvId?: string;
  isValid: (input: string) => boolean;
  submit: (input: string) => void;
  input?: string;
}

export const ObjectKeyModal: React.FC<ObjectKeyModalProps> = ({
  theme: themeProp,
  isValid,
  submit,
  input: initialInput = ''
}) => {
  const { theme: contextTheme, dispatch } = use(JsonViewContext);
  const theme = themeProp ?? contextTheme;
  const [input, setInput] = useState<string>(initialInput);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const valid = isValid(input);

  const closeModal = () => {
    dispatch({
      type: 'RESET'
    });
  };

  const handleSubmit = () => {
    submit(input);
  };

  return (
    <div className="key-modal-request" {...Theme(theme, 'key-modal-request')} onClick={closeModal}>
      <div
        {...Theme(theme, 'key-modal')}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div {...Theme(theme, 'key-modal-label')}>Key Name:</div>
        <div style={{ position: 'relative' }}>
          <input
            {...Theme(theme, 'key-modal-input')}
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
              {...Theme(theme, 'key-modal-submit')}
              className="key-modal-submit"
              onClick={() => handleSubmit()}
            />
          ) : null}
        </div>
        <span {...Theme(theme, 'key-modal-cancel')}>
          <Cancel
            {...Theme(theme, 'key-modal-cancel-icon')}
            className="key-modal-cancel"
            onClick={closeModal}
          />
        </span>
      </div>
    </div>
  );
};

export default ObjectKeyModal;
