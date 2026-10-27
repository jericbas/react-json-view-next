import type React from 'react';
import Theme from '../../themes/getStyle';
import type { JsonVariable, ThemeKeys, ThemeObject } from '../../types';

export interface VariableKeyLabelProps {
  type?: string | undefined;
  displayArrayKey?: boolean | undefined;
  theme: ThemeKeys | ThemeObject;
  variable: JsonVariable;
  namespace: Array<string | number | null>;
  quotesOnKeys?: boolean | undefined;
}

export const VariableKeyLabel: React.FC<VariableKeyLabelProps> = ({
  type,
  displayArrayKey = true,
  theme,
  variable,
  namespace,
  quotesOnKeys = true
}) => {
  if (type === 'array') {
    if (!displayArrayKey) return null;
    return (
      <span {...Theme(theme, 'array-key')} key={`${variable.name}_${namespace.join('.')}`}>
        {variable.name}
        <div {...Theme(theme, 'colon')}>:</div>
      </span>
    );
  }

  return (
    <span>
      <span
        {...Theme(theme, 'object-name')}
        className="object-key"
        key={`${variable.name}_${namespace.join('.')}`}
      >
        {!!quotesOnKeys && <span style={{ verticalAlign: 'top' }}>"</span>}
        <span style={{ display: 'inline-block' }}>{variable.name}</span>
        {!!quotesOnKeys && <span style={{ verticalAlign: 'top' }}>"</span>}
      </span>
      <span {...Theme(theme, 'colon')}>:</span>
    </span>
  );
};
