import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';

export interface NanProps {
  theme?: ThemeKeys | ThemeObject | undefined;
  rjvId?: string | undefined;
  displayDataTypes?: boolean | undefined;
  value?: unknown;
}

export const JsonNan: React.FC<NanProps> = ({ theme = 'rjv-default' }) => {
  return <div {...Theme(theme, 'nan')}>NaN</div>;
};

export default JsonNan;
