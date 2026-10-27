import type React from 'react';
import { Add as Clear } from '../../../components/icons';
import type { ThemeKeys, ThemeObject } from '../../../types';
import { getEditorStyle } from '../style';

export interface ValidationFailureProps {
  message?: string | undefined;
  active?: boolean | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  rjvId?: string | undefined;
  onDismiss?: (() => void) | undefined;
}

export const ValidationFailure: React.FC<ValidationFailureProps> = ({
  message = 'Validation Error',
  active = false,
  theme = 'rjv-default',
  onDismiss
}) => {
  if (!active) {
    return null;
  }

  return (
    <div
      className="validation-failure"
      {...getEditorStyle(theme, 'validation-failure')}
      onClick={onDismiss}
    >
      <span {...getEditorStyle(theme, 'validation-failure-label')}>{message}</span>
      <Clear {...getEditorStyle(theme, 'validation-failure-clear')} />
    </div>
  );
};

export default ValidationFailure;
