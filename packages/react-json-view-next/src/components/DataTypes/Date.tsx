import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import DataTypeLabel from './DataTypeLabel';

export interface DateProps {
  value: Date;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayDataTypes?: boolean | undefined;
  rjvId?: string | undefined;
}

const display_options: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

export const JsonDate: React.FC<DateProps> = props => {
  const { value, theme = 'rjv-default' } = props;
  const type_name = 'date';

  return (
    <div {...Theme(theme, 'date')}>
      <DataTypeLabel type_name={type_name} {...props} />
      <span className="date-value" {...Theme(theme, 'date-value')}>
        {value.toLocaleTimeString('en-us', display_options)}
      </span>
    </div>
  );
};

export default JsonDate;
