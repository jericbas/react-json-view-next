import type React from 'react';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';

export interface DataTypeLabelProps {
  rjvId?: string | undefined;
  type_name: string;
  displayDataTypes?: boolean | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
}

export const DataTypeLabel: React.FC<DataTypeLabelProps> = ({
  type_name,
  displayDataTypes = true,
  theme = 'rjv-default'
}) => {
  if (displayDataTypes) {
    return (
      <span className="data-type-label" {...Theme(theme, 'data-type-label')}>
        {type_name}
      </span>
    );
  }
  return null;
};

export default DataTypeLabel;
