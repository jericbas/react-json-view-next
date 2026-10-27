import type React from 'react';
import { use } from 'react';
import { JsonViewContext } from '../../context/JsonViewContext';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import DataTypeLabel from './DataTypeLabel';

export interface FunctionProps {
  value: (...args: unknown[]) => unknown;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayDataTypes?: boolean | undefined;
  rjvId?: string | undefined;
  namespace: Array<string | number | null>;
}

export const JsonFunction: React.FC<FunctionProps> = props => {
  const {
    collapsed: collapsedMap,
    setCollapsed: setContextCollapsed,
    theme: contextTheme
  } = use(JsonViewContext);
  const { value, theme = contextTheme || 'rjv-default', namespace } = props;
  const type_name = 'function';
  const nodeKey = namespace.join('.');
  const collapsed = collapsedMap[nodeKey] !== undefined ? collapsedMap[nodeKey] : true;

  const toggleCollapsed = () => {
    setContextCollapsed(nodeKey, !collapsed);
  };

  const getFunctionDisplay = () => {
    const fnStr = value.toString();
    if (collapsed) {
      return (
        <span>
          {fnStr.slice(9, -1).replace(/\{[\s\S]+/, '')}
          <span className="function-collapsed" style={{ fontWeight: 'bold' }}>
            <span>{'{'}</span>
            <span {...Theme(theme, 'ellipsis')}>...</span>
            <span>{'}'}</span>
          </span>
        </span>
      );
    } else {
      return fnStr.slice(9, -1);
    }
  };

  return (
    <div {...Theme(theme, 'function')}>
      <DataTypeLabel type_name={type_name} {...props} />
      <span
        {...Theme(theme, 'function-value')}
        className="rjv-function-container"
        onClick={toggleCollapsed}
      >
        {getFunctionDisplay()}
      </span>
    </div>
  );
};

export default JsonFunction;
