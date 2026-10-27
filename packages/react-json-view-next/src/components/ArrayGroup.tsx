import type React from 'react';
import { useState } from 'react';
import Theme from '../themes/getStyle';
import type { IconStyle, ThemeKeys, ThemeObject } from '../types';
import ObjectComponent from './DataTypes/Object';
import ObjectName from './ObjectName';
import { CollapsedIcon, ExpandedIcon } from './ToggleIcons';
import VariableMeta from './VariableMeta';

const SINGLE_INDENT = 5;

export interface ArrayGroupProps {
  src: any[];
  groupArraysAfterLength: number;
  depth?: number;
  name?: string | number | null | false;
  theme?: ThemeKeys | ThemeObject;
  jsvRoot?: boolean;
  namespace: Array<string | number | null>;
  parent_type?: string;
  indentWidth?: number;
  iconStyle?: IconStyle;
  displayObjectSize?: boolean;
  onDelete?: ((del: any) => false | unknown) | false;
  onAdd?: ((add: any) => false | unknown) | false;
  enableClipboard?: boolean | ((copy: any) => void) | undefined;
  rjvId?: string | undefined;
  [key: string]: any;
}

export const ArrayGroup: React.FC<ArrayGroupProps> = props => {
  const {
    src,
    groupArraysAfterLength,
    depth = 0,
    name,
    theme = 'rjv-default',
    jsvRoot = false,
    namespace,
    parent_type,
    indentWidth = 4,
    iconStyle = 'triangle',
    rjvId,
    ...rest
  } = props;

  const [expanded, setExpanded] = useState<boolean[]>([]);

  const toggleCollapsed = (i: number) => {
    setExpanded(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const getExpandedIcon = (i: number) => {
    if (expanded[i]) {
      return <ExpandedIcon theme={theme} iconStyle={iconStyle} />;
    }
    return <CollapsedIcon theme={theme} iconStyle={iconStyle} />;
  };

  let object_padding_left = 0;
  const array_group_padding_left = indentWidth * SINGLE_INDENT;

  if (!jsvRoot) {
    object_padding_left = indentWidth * SINGLE_INDENT;
  }

  const size = groupArraysAfterLength;
  const groups = Math.ceil(src.length / size);

  return (
    <div
      className="object-key-val"
      {...Theme(theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', {
        paddingLeft: object_padding_left
      })}
    >
      <ObjectName {...props} />

      <span>
        <VariableMeta size={src.length} {...props} />
      </span>
      {[...Array(groups)].map((_, i) => (
        <div
          key={i}
          className="object-key-val array-group"
          {...Theme(theme, 'objectKeyVal', {
            marginLeft: 6,
            paddingLeft: array_group_padding_left
          })}
        >
          <span {...Theme(theme, 'brace-row')}>
            <div
              className="icon-container"
              {...Theme(theme, 'icon-container')}
              onClick={() => {
                toggleCollapsed(i);
              }}
            >
              {getExpandedIcon(i)}
            </div>
            {expanded[i] ? (
              <ObjectComponent
                key={String(name) + i}
                depth={0}
                name={false}
                collapsed={false}
                groupArraysAfterLength={size}
                index_offset={i * size}
                src={src.slice(i * size, i * size + size)}
                namespace={namespace}
                type="array"
                parent_type="array_group"
                theme={theme}
                indentWidth={indentWidth}
                iconStyle={iconStyle}
                rjvId={rjvId}
                {...rest}
              />
            ) : (
              <span
                {...Theme(theme, 'brace')}
                onClick={() => {
                  toggleCollapsed(i);
                }}
                className="array-group-brace"
              >
                [
                <div {...Theme(theme, 'array-group-meta-data')} className="array-group-meta-data">
                  <span className="object-size" {...Theme(theme, 'object-size')}>
                    {i * size}
                    {' - '}
                    {Math.min(i * size + size, src.length)}
                  </span>
                </div>
                ]
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ArrayGroup;
