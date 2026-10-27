import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import DataTypeLabel from './DataTypeLabel';

export interface FloatProps {
  value: number;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayDataTypes?: boolean | undefined;
  rjvId?: string | undefined;
}

export const JsonFloat: React.FC<FloatProps> = props => {
  const { value, theme = 'rjv-default' } = props;
  const type_name = 'float';

  return (
    <div {...Theme(theme, 'float')}>
      <DataTypeLabel type_name={type_name} {...props} />
      {value}
    </div>
  );
};

export default JsonFloat;
