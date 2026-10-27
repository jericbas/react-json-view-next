import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';

export interface NullProps {
  theme?: ThemeKeys | ThemeObject | undefined;
  rjvId?: string | undefined;
  displayDataTypes?: boolean | undefined;
  value?: unknown;
}

export const JsonNull: React.FC<NullProps> = ({ theme = 'rjv-default' }) => {
  return <div {...Theme(theme, 'null')}>NULL</div>;
};

export default JsonNull;
