import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';

export interface UndefinedProps {
  theme?: ThemeKeys | ThemeObject | undefined;
  rjvId?: string | undefined;
  displayDataTypes?: boolean | undefined;
  value?: unknown;
}

export const JsonUndefined: React.FC<UndefinedProps> = ({ theme = 'rjv-default' }) => {
  return <div {...Theme(theme, 'undefined')}>undefined</div>;
};

export default JsonUndefined;
