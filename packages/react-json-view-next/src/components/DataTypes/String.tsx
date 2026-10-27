import type React from 'react';
import { use } from 'react';
import { JsonViewContext } from '../../context/JsonViewContext';
import { toType } from '../../helpers/util';
import Theme from '../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../types';
import DataTypeLabel from './DataTypeLabel';

export interface StringProps {
  value: string;
  collapseStringsAfterLength?: number | false | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayDataTypes?: boolean | undefined;
  rjvId?: string | undefined;
  namespace: Array<string | number | null>;
}

export const JsonString: React.FC<StringProps> = props => {
  const {
    collapsed: collapsedMap,
    setCollapsed: setContextCollapsed,
    theme: contextTheme
  } = use(JsonViewContext);
  const {
    collapseStringsAfterLength = false,
    theme = contextTheme || 'rjv-default',
    namespace
  } = props;
  let { value } = props;
  const type_name = 'string';
  const nodeKey = namespace.join('.');
  const collapsed = collapsedMap[nodeKey] !== undefined ? collapsedMap[nodeKey] : true;

  const toggleCollapsed = () => {
    setContextCollapsed(nodeKey, !collapsed);
  };

  const collapsible = toType(collapseStringsAfterLength) === 'integer';
  const style: { style: React.CSSProperties } = { style: { cursor: 'default' } };

  if (
    collapsible &&
    typeof collapseStringsAfterLength === 'number' &&
    value.length > collapseStringsAfterLength
  ) {
    style.style.cursor = 'pointer';
    if (collapsed) {
      value = value.substring(0, collapseStringsAfterLength);
    }
  }

  return (
    <div {...Theme(theme, 'string')}>
      <DataTypeLabel type_name={type_name} {...props} />
      <span className="string-value" {...style} onClick={toggleCollapsed}>
        "{value}
        {collapsible &&
          typeof collapseStringsAfterLength === 'number' &&
          props.value.length > collapseStringsAfterLength &&
          collapsed && <span {...Theme(theme, 'ellipsis')}> ...</span>}
        "
      </span>
    </div>
  );
};

export default JsonString;
