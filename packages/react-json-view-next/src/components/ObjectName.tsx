import type React from 'react';
import Theme from '../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../types';

export interface ObjectNameProps {
  parent_type?: string | undefined;
  namespace: Array<string | number | null>;
  quotesOnKeys?: boolean | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  jsvRoot?: boolean | undefined;
  name?: string | number | null | false | undefined;
  displayArrayKey?: boolean | undefined;
}

export const ObjectName: React.FC<ObjectNameProps> = ({
  parent_type,
  namespace,
  quotesOnKeys = true,
  theme = 'rjv-default',
  jsvRoot = false,
  name,
  displayArrayKey = true
}) => {
  const display_name = name !== undefined && name !== null && name !== false ? String(name) : '';

  if (jsvRoot && (name === false || name === null)) {
    return <span />;
  } else if (parent_type === 'array') {
    return displayArrayKey ? (
      <span {...Theme(theme, 'array-key')} key={namespace.join('.')}>
        <span className="array-key">{display_name}</span>
        <span {...Theme(theme, 'colon')}>:</span>
      </span>
    ) : (
      <span />
    );
  } else {
    return (
      <span {...Theme(theme, 'object-name')} key={namespace.join('.')}>
        <span className="object-key">
          {quotesOnKeys && <span style={{ verticalAlign: 'top' }}>"</span>}
          <span>{display_name}</span>
          {quotesOnKeys && <span style={{ verticalAlign: 'top' }}>"</span>}
        </span>
        <span {...Theme(theme, 'colon')}>:</span>
      </span>
    );
  }
};

export default ObjectName;
