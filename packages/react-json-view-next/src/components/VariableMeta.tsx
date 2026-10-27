import type React from 'react';
import { use } from 'react';
import { JsonViewContext } from '../context/JsonViewContext';
import { toType } from '../helpers/util';
import Theme from '../themes/getStyle';
import type { OnCopyProps, ThemeKeys, ThemeObject } from '../types';
import CopyToClipboard from './CopyToClipboard';
import { AddCircle as Add, RemoveCircle as Remove } from './icons';

export interface VariableMetaProps {
  size?: number | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  displayObjectSize?: boolean | undefined;
  namespace: Array<string | number | null>;
  name?: string | number | null | false | undefined;
  src: any;
  rjvId?: string | undefined;
  depth?: number | undefined;
  onDelete?: ((del: any) => false | unknown) | false | undefined;
  onAdd?: ((add: any) => false | unknown) | false | undefined;
  enableClipboard?: boolean | ((copy: OnCopyProps) => void) | undefined;
  rowHovered?: boolean | undefined;
}

export const VariableMeta: React.FC<VariableMetaProps> = ({
  size,
  theme: themeProp,
  displayObjectSize = true,
  namespace,
  name,
  src,
  depth = 0,
  onDelete = false,
  onAdd = false,
  enableClipboard = true,
  rowHovered = false
}) => {
  const { dispatch, theme: contextTheme } = use(JsonViewContext);
  const theme = themeProp ?? contextTheme;

  const getObjectSize = () => {
    if (displayObjectSize && size !== undefined) {
      return (
        <span className="object-size" {...Theme(theme, 'object-size')}>
          {size} item{size === 1 ? '' : 's'}
        </span>
      );
    }
    return null;
  };

  const getAddAttribute = () => {
    return (
      <span
        className="click-to-add"
        style={{
          verticalAlign: 'top',
          display: rowHovered ? 'inline-block' : 'none'
        }}
      >
        <Add
          className="click-to-add-icon"
          {...Theme(theme, 'addVarIcon')}
          onClick={() => {
            const parentNamespace = namespace.slice(0, namespace.length - 1);
            const request = {
              name: depth > 0 ? (name ?? null) : null,
              namespace: parentNamespace,
              existing_value: src,
              variable_removed: false,
              key_name: null
            };
            if (toType(src) === 'object') {
              dispatch({
                type: 'ADD_VARIABLE_KEY_REQUEST',
                payload: request
              });
            } else {
              dispatch({
                type: 'VARIABLE_ADDED',
                payload: {
                  ...request,
                  new_value: Array.isArray(src) ? [...src, null] : [null]
                }
              });
            }
          }}
        />
      </span>
    );
  };

  const getRemoveObject = () => {
    // don't allow deleting of root node
    if (namespace.length <= 1) {
      return null;
    }
    return (
      <span
        className="click-to-remove"
        style={{
          display: rowHovered ? 'inline-block' : 'none'
        }}
      >
        <Remove
          className="click-to-remove-icon"
          {...Theme(theme, 'removeVarIcon')}
          onClick={() => {
            const parentNamespace = namespace.slice(0, namespace.length - 1);
            dispatch({
              type: 'VARIABLE_REMOVED',
              payload: {
                name: name,
                namespace: parentNamespace,
                existing_value: src,
                variable_removed: true
              }
            });
          }}
        />
      </span>
    );
  };

  return (
    <div
      {...Theme(theme, 'object-meta-data')}
      className="object-meta-data"
      onClick={e => {
        e.stopPropagation();
      }}
    >
      {/* size badge display */}
      {getObjectSize()}
      {/* copy to clipboard icon */}
      {enableClipboard ? (
        <CopyToClipboard
          rowHovered={rowHovered}
          clickCallback={enableClipboard}
          src={src}
          theme={theme}
          namespace={namespace}
        />
      ) : null}
      {/* copy add/remove icons */}
      {onAdd !== false ? getAddAttribute() : null}
      {onDelete !== false ? getRemoveObject() : null}
    </div>
  );
};

export default VariableMeta;
