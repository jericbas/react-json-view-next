import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import DataTypeLabel from './DataTypeLabel';

export interface IntegerProps {
  value: number;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayDataTypes?: boolean | undefined;
  rjvId?: string | undefined;
}

export const JsonInteger: React.FC<IntegerProps> = props => {
  const { value, theme = 'rjv-default' } = props;
  const type_name = 'int';

  return (
    <div {...Theme(theme, 'integer')}>
      <DataTypeLabel type_name={type_name} {...props} />
      {value}
    </div>
  );
};

export default JsonInteger;
