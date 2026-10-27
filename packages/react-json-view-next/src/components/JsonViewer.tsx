import React, { use } from 'react';
import { useJsonView } from '../context/JsonViewContext';
import JsonViewProvider from '../context/JsonViewProvider';
import { isPromise, validateProps } from '../helpers/validateProps';
import Theme from '../themes/getStyle';
import type { JsonViewerProps } from '../types';
import ArrayGroup from './ArrayGroup';
import JsonObject from './DataTypes/Object';

const JsonViewerTree: React.FC<JsonViewerProps> = props => {
  const { rjvId, plugins, theme, src: contextSrc } = useJsonView();
  const { src: propSrc, name = 'root', groupArraysAfterLength = 100, style = {}, ...rest } = props;
  const src = contextSrc !== undefined ? contextSrc : propSrc;

  const namespace: Array<string | number | null> = [name === false ? null : name];
  let ObjectComponent: React.ComponentType<any> = JsonObject;

  if (Array.isArray(src) && groupArraysAfterLength && src.length > groupArraysAfterLength) {
    ObjectComponent = ArrayGroup;
  }

  const defaultRenderTree = () => (
    <div className="pretty-json-container object-container">
      <div className="object-content">
        <ObjectComponent
          namespace={namespace}
          depth={0}
          jsvRoot={true}
          groupArraysAfterLength={groupArraysAfterLength}
          {...rest}
          src={src}
          name={name}
          theme={theme}
        />
      </div>
    </div>
  );

  let treeContent: React.ReactNode;
  for (const plugin of plugins) {
    if (plugin.renderTree) {
      const intercepted = plugin.renderTree({
        src,
        name,
        theme,
        depth: 0,
        namespace,
        defaultRender: defaultRenderTree
      });
      if (intercepted !== undefined) {
        treeContent = intercepted;
        break;
      }
    }
  }

  if (treeContent === undefined) {
    treeContent = defaultRenderTree();
  }

  return (
    <div
      className="react-json-view react-json-view-next"
      style={{ ...Theme(theme, 'app-container').style, ...style }}
    >
      {plugins.map((plugin, idx) => (
        <React.Fragment key={plugin.name || `overlay-${idx}`}>
          {plugin.renderRootOverlay?.({ rjvId, theme, src })}
        </React.Fragment>
      ))}
      {treeContent}
    </div>
  );
};

export const JsonViewer: React.FC<JsonViewerProps> = props => {
  const {
    src: srcProp = {},
    name: nameProp = 'root',
    theme: themeProp = 'rjv-default',
    collapsed = false,
    collapseStringsAfterLength = false,
    shouldCollapse = false,
    sortKeys = false,
    quotesOnKeys = true,
    groupArraysAfterLength = 100,
    indentWidth = 4,
    displayObjectSize = true,
    displayDataTypes = true,
    onSelect = false,
    iconStyle = 'triangle',
    style = {},
    defaultValue = null,
    displayArrayKey = true,
    plugins = [],
    ...rest
  } = props;

  // React 19: unwrap Promise if src is thenable using native use() hook
  const resolvedSrc = isPromise(srcProp) ? use(srcProp) : srcProp;
  const stringifiedName =
    nameProp === false
      ? false
      : nameProp !== null && nameProp !== undefined
        ? String(nameProp)
        : null;
  const validated = validateProps(resolvedSrc, stringifiedName, themeProp, undefined);

  return (
    <JsonViewProvider
      src={validated.src}
      name={validated.name}
      theme={validated.theme}
      plugins={plugins}
    >
      <JsonViewerTree
        collapsed={collapsed}
        collapseStringsAfterLength={collapseStringsAfterLength}
        shouldCollapse={shouldCollapse}
        sortKeys={sortKeys}
        quotesOnKeys={quotesOnKeys}
        groupArraysAfterLength={groupArraysAfterLength}
        indentWidth={indentWidth}
        displayObjectSize={displayObjectSize}
        displayDataTypes={displayDataTypes}
        onSelect={onSelect}
        iconStyle={iconStyle}
        style={style}
        defaultValue={defaultValue}
        displayArrayKey={displayArrayKey}
        {...rest}
        src={validated.src}
        name={validated.name}
        theme={validated.theme}
      />
    </JsonViewProvider>
  );
};

export default JsonViewer;
