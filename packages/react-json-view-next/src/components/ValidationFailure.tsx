import type React from 'react';
import { use } from 'react';
import { JsonViewContext } from '../context/JsonViewContext';
import Theme from '../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../types';
import { Add as Clear } from './icons';

export interface ValidationFailureProps {
  message?: string;
  active?: boolean;
  theme?: ThemeKeys | ThemeObject;
  rjvId?: string;
}

export const ValidationFailure: React.FC<ValidationFailureProps> = ({
  message: messageProp,
  active: activeProp,
  theme: themeProp
}) => {
  const {
    validationFailure,
    validationMessage,
    theme: contextTheme,
    dispatch
  } = use(JsonViewContext);
  const active = activeProp ?? validationFailure;
  const message = messageProp ?? validationMessage;
  const theme = themeProp ?? contextTheme;

  if (!active) {
    return null;
  }

  return (
    <div
      className="validation-failure"
      {...Theme(theme, 'validation-failure')}
      onClick={() => {
        dispatch({
          type: 'RESET'
        });
      }}
    >
      <span {...Theme(theme, 'validation-failure-label')}>{message}</span>
      <Clear {...Theme(theme, 'validation-failure-clear')} />
    </div>
  );
};

export default ValidationFailure;
