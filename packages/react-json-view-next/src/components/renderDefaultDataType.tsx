import type React from 'react';
import type { JsonVariable } from '../types';
import {
  JsonBoolean,
  JsonDate,
  JsonFloat,
  JsonFunction,
  JsonInteger,
  JsonNan,
  JsonNull,
  JsonRegexp,
  JsonString,
  JsonUndefined
} from './DataTypes/DataTypes';

export function renderDefaultDataType(
  variable: JsonVariable,
  theme: any,
  namespace: Array<string | number | null>,
  displayDataTypes?: boolean,
  collapseStringsAfterLength?: number | false,
  rjvId?: string
): React.ReactNode {
  const commonProps = {
    displayDataTypes,
    rjvId
  };

  switch (variable.type) {
    case 'string':
      return (
        <JsonString
          value={variable.value}
          theme={theme}
          namespace={namespace}
          collapseStringsAfterLength={collapseStringsAfterLength}
          {...commonProps}
        />
      );
    case 'integer':
      return <JsonInteger value={variable.value} theme={theme} {...commonProps} />;
    case 'float':
      return <JsonFloat value={variable.value} theme={theme} {...commonProps} />;
    case 'boolean':
      return <JsonBoolean value={variable.value} theme={theme} {...commonProps} />;
    case 'function':
      return (
        <JsonFunction value={variable.value} theme={theme} namespace={namespace} {...commonProps} />
      );
    case 'null':
      return <JsonNull theme={theme} {...commonProps} />;
    case 'nan':
      return <JsonNan theme={theme} {...commonProps} />;
    case 'undefined':
      return <JsonUndefined theme={theme} {...commonProps} />;
    case 'date':
      return <JsonDate value={variable.value} theme={theme} {...commonProps} />;
    case 'regexp':
      return <JsonRegexp value={variable.value} theme={theme} {...commonProps} />;
    default:
      return <div className="object-value">{JSON.stringify(variable.value)}</div>;
  }
}

export default renderDefaultDataType;
