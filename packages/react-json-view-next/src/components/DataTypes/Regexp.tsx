import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import DataTypeLabel from './DataTypeLabel';

export interface RegexpProps {
  value: RegExp;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayDataTypes?: boolean | undefined;
  rjvId?: string | undefined;
}

export const JsonRegexp: React.FC<RegexpProps> = props => {
  const { value, theme = 'rjv-default' } = props;
  const type_name = 'regexp';

  return (
    <div {...Theme(theme, 'regexp')}>
      <DataTypeLabel type_name={type_name} {...props} />
      {value.toString()}
    </div>
  );
};

export default JsonRegexp;
