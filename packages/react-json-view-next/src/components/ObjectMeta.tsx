import type React from 'react';
import { useJsonView } from '../context/JsonViewContext';
import Theme from '../themes/getStyle';
import type { JsonVariable, ThemeKeys, ThemeObject } from '../types';

export interface ObjectMetaProps {
  size?: number | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayObjectSize?: boolean | undefined;
  namespace?: Array<string | number | null> | undefined;
  name?: string | number | null | false | undefined;
  src?: any;
  depth?: number | undefined;
  rowHovered?: boolean | undefined;
}

export const ObjectMeta: React.FC<ObjectMetaProps> = ({
  size,
  theme: themeProp,
  displayObjectSize = true,
  namespace = [],
  name = null,
  src,
  depth = 0,
  rowHovered = false
}) => {
  const context = useJsonView();
  const theme = themeProp ?? context.theme;
  const plugins = context.plugins || [];

  const variable: JsonVariable = {
    name: name === false ? '' : (name ?? ''),
    value: src,
    type: Array.isArray(src) ? 'array' : 'object'
  };

  return (
    <>
      {displayObjectSize && size !== undefined ? (
        <span className="object-size" {...Theme(theme, 'object-size')}>
          {size} item{size === 1 ? '' : 's'}
        </span>
      ) : null}
      {plugins.map((plugin, idx) => {
        const actionNode = plugin.renderRowActions?.({
          variable,
          namespace,
          theme,
          hovered: rowHovered,
          depth
        });
        return actionNode ? (
          <span key={plugin.name || `object-action-${idx}`} className="row-action-slot">
            {actionNode}
          </span>
        ) : null;
      })}
    </>
  );
};

export default ObjectMeta;
