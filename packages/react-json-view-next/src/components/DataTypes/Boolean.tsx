import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import DataTypeLabel from './DataTypeLabel';

export interface BooleanProps {
  value: boolean;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayDataTypes?: boolean | undefined;
  rjvId?: string | undefined;
}

export const JsonBoolean: React.FC<BooleanProps> = props => {
  const { value, theme = 'rjv-default' } = props;
  const type_name = 'bool';

  return (
    <div {...Theme(theme, 'boolean')}>
      <DataTypeLabel type_name={type_name} {...props} />
      {value ? 'true' : 'false'}
    </div>
  );
};

export default JsonBoolean;
