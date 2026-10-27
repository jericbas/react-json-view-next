import type React from 'react';
import { toType } from '../../helpers/util';
import type {
  CollapsedFieldProps,
  IconStyle,
  JsonVariable,
  ThemeKeys,
  ThemeObject
} from '../../types';
import ArrayGroup from '../ArrayGroup';
import VariableRow from '../VariableRow';
import { RjvObject } from './Object';

const DEPTH_INCREMENT = 1;
const SINGLE_INDENT = 5;

export interface ObjectContentProps {
  variables: any;
  sortKeys?: boolean | undefined;
  object_type: 'array' | 'object';
  parent_type?: string | undefined;
  index_offset?: number | undefined;
  depth: number;
  namespace: Array<string | number | null>;
  theme: ThemeKeys | ThemeObject;
  iconStyle: IconStyle;
  rjvId?: string | undefined;
  indentWidth: number;
  shouldCollapse?: false | ((field: CollapsedFieldProps) => boolean) | undefined;
  groupArraysAfterLength: number | false;
  [key: string]: any;
}

export const ObjectContent: React.FC<ObjectContentProps> = ({
  variables,
  sortKeys = false,
  object_type,
  parent_type,
  index_offset,
  depth,
  namespace,
  theme,
  iconStyle,
  rjvId,
  indentWidth,
  shouldCollapse,
  groupArraysAfterLength,
  ...rest
}) => {
  const elements: React.ReactElement[] = [];
  let keys = Object.keys(variables || {});
  if (sortKeys && object_type !== 'array') {
    keys = keys.sort();
  }

  keys.forEach(k => {
    const variable: JsonVariable = {
      name: k,
      value: variables[k],
      type: toType(variables[k])
    };

    if (parent_type === 'array_group' && index_offset !== undefined) {
      variable.name = parseInt(String(variable.name), 10) + index_offset;
    }

    if (!Object.hasOwn(variables, k)) {
      return;
    } else if (variable.type === 'object') {
      elements.push(
        <RjvObject
          key={String(variable.name)}
          depth={depth + DEPTH_INCREMENT}
          name={variable.name}
          src={variable.value}
          namespace={namespace.concat(variable.name)}
          parent_type={object_type}
          theme={theme}
          iconStyle={iconStyle}
          rjvId={rjvId}
          indentWidth={indentWidth}
          shouldCollapse={shouldCollapse}
          sortKeys={sortKeys}
          groupArraysAfterLength={groupArraysAfterLength}
          {...rest}
        />
      );
    } else if (variable.type === 'array') {
      if (
        groupArraysAfterLength &&
        Array.isArray(variable.value) &&
        variable.value.length > groupArraysAfterLength
      ) {
        elements.push(
          <ArrayGroup
            key={String(variable.name)}
            name={variable.name}
            src={variable.value}
            depth={depth + DEPTH_INCREMENT}
            theme={theme}
            namespace={namespace.concat(variable.name)}
            parent_type={object_type}
            iconStyle={iconStyle}
            rjvId={rjvId}
            indentWidth={indentWidth}
            groupArraysAfterLength={groupArraysAfterLength}
            {...rest}
          />
        );
      } else {
        elements.push(
          <RjvObject
            key={String(variable.name)}
            depth={depth + DEPTH_INCREMENT}
            name={variable.name}
            src={variable.value}
            namespace={namespace.concat(variable.name)}
            type="array"
            parent_type={object_type}
            theme={theme}
            iconStyle={iconStyle}
            rjvId={rjvId}
            indentWidth={indentWidth}
            shouldCollapse={shouldCollapse}
            sortKeys={sortKeys}
            groupArraysAfterLength={groupArraysAfterLength}
            {...rest}
          />
        );
      }
    } else {
      elements.push(
        <VariableRow
          key={String(variable.name)}
          variable={variable}
          singleIndent={SINGLE_INDENT}
          rjvId={rjvId}
          theme={theme}
          type={object_type}
          indentWidth={indentWidth}
          namespace={namespace.concat(variable.name)}
          depth={depth + DEPTH_INCREMENT}
          {...rest}
        />
      );
    }
  });

  return <>{elements}</>;
};
