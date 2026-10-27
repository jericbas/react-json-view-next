import type React from 'react';
import { use, useState } from 'react';
import { JsonViewContext } from '../../context/JsonViewContext';
import { toType } from '../../helpers/util';
import Theme from '../../themes/getStyle';
import type { CollapsedFieldProps, IconStyle, ThemeKeys, ThemeObject } from '../../types';
import ObjectMeta from '../ObjectMeta';
import ObjectName from '../ObjectName';
import { CollapsedIcon, ExpandedIcon } from '../ToggleIcons';
import { ObjectContent } from './ObjectContent';

const SINGLE_INDENT = 5;

export interface RjvObjectProps {
  src: any;
  collapsed?: boolean | number | undefined;
  depth?: number | undefined;
  name?: string | number | null | false | undefined;
  namespace: Array<string | number | null>;
  type?: string | undefined;
  parent_type?: string | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  jsvRoot?: boolean | undefined;
  iconStyle?: IconStyle | undefined;
  rjvId?: string | undefined;
  indentWidth?: number | undefined;
  shouldCollapse?: false | ((field: CollapsedFieldProps) => boolean) | undefined;
  sortKeys?: boolean | undefined;
  groupArraysAfterLength?: number | false | undefined;
  index_offset?: number | undefined;
  [key: string]: any;
}

function calculateDefaultExpanded(props: RjvObjectProps): boolean {
  const size = Object.keys(props.src || {}).length;
  const depth = props.depth ?? 0;
  return (
    (props.collapsed === false ||
      (props.collapsed !== true &&
        typeof props.collapsed === 'number' &&
        props.collapsed > depth)) &&
    (!props.shouldCollapse ||
      props.shouldCollapse({
        name: props.name ?? null,
        src: props.src,
        type: toType(props.src),
        namespace: props.namespace
      }) === false) &&
    size !== 0
  );
}

export const RjvObject: React.FC<RjvObjectProps> = props => {
  const {
    expanded: expandedMap,
    setExpanded: setContextExpanded,
    theme: contextTheme
  } = use(JsonViewContext);
  const {
    depth = 0,
    src,
    namespace,
    name,
    type,
    parent_type,
    theme = contextTheme || 'rjv-default',
    jsvRoot = false,
    iconStyle = 'triangle',
    rjvId,
    indentWidth = 4,
    shouldCollapse = false,
    sortKeys = false,
    groupArraysAfterLength = 100,
    index_offset,
    ...rest
  } = props;

  const size = Object.keys(src || {}).length;
  const object_type = type === 'array' ? 'array' : 'object';

  const nodeKey = namespace.join('.');
  const defaultExpanded = calculateDefaultExpanded(props);
  const expanded = expandedMap[nodeKey] !== undefined ? expandedMap[nodeKey] : defaultExpanded;
  const [hovered, setHovered] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setContextExpanded(nodeKey, !expanded);
  };

  const getEllipsis = () => {
    if (size === 0) return null;
    return (
      <div {...Theme(theme, 'ellipsis')} className="node-ellipsis" onClick={toggleCollapsed}>
        ...
      </div>
    );
  };

  const getObjectMetaData = () => (
    <ObjectMeta
      rowHovered={hovered}
      size={size}
      src={src}
      theme={theme}
      namespace={namespace}
      name={name}
      depth={depth}
      displayObjectSize={props.displayObjectSize}
    />
  );

  const getBraceStart = () => {
    if (parent_type === 'array_group') {
      return (
        <span>
          <span {...Theme(theme, 'brace')}>{object_type === 'array' ? '[' : '{'}</span>
          {expanded ? getObjectMetaData() : null}
        </span>
      );
    }

    const IconComponent = expanded ? ExpandedIcon : CollapsedIcon;

    return (
      <span>
        <span onClick={() => toggleCollapsed()} {...Theme(theme, 'brace-row')}>
          <div className="icon-container" {...Theme(theme, 'icon-container')}>
            <IconComponent theme={theme} iconStyle={iconStyle} />
          </div>
          <ObjectName
            parent_type={parent_type}
            namespace={namespace}
            theme={theme}
            jsvRoot={jsvRoot}
            name={name}
            {...rest}
          />
          <span {...Theme(theme, 'brace')}>{object_type === 'array' ? '[' : '{'}</span>
        </span>
        {expanded ? getObjectMetaData() : null}
      </span>
    );
  };

  const styles: React.CSSProperties = {};
  if (!jsvRoot) {
    styles.paddingLeft = `${indentWidth * SINGLE_INDENT}px`;
  }

  return (
    <div
      className="object-key-val"
      {...Theme(theme, 'object-container')}
      style={{
        position: 'relative',
        ...styles
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pushed-content object-key" {...Theme(theme, 'pushed-content')}>
        {getBraceStart()}
      </div>
      {expanded ? (
        <div className="expanded-row" {...Theme(theme, 'expanded-row')}>
          <ObjectContent
            variables={src}
            sortKeys={sortKeys}
            object_type={object_type}
            parent_type={parent_type}
            index_offset={index_offset}
            depth={depth}
            namespace={namespace}
            theme={theme}
            iconStyle={iconStyle}
            rjvId={rjvId}
            indentWidth={indentWidth}
            shouldCollapse={shouldCollapse}
            groupArraysAfterLength={groupArraysAfterLength}
            {...rest}
          />
        </div>
      ) : (
        getEllipsis()
      )}
      <span className="brace" {...Theme(theme, 'brace')}>
        {object_type === 'array' ? ']' : '}'}
      </span>
      {expanded ? null : getObjectMetaData()}
    </div>
  );
};

export default RjvObject;
