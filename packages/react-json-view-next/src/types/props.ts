import type * as React from 'react';
import type {
  CollapsedFieldProps,
  InteractionProps,
  OnCopyProps,
  OnSelectProps,
  TypeDefaultValue
} from './interaction';
import type { JsonViewPlugin } from './plugin';
import type { IconStyle, ThemeKeys, ThemeObject } from './theme';

export interface JsonViewerProps {
  src: object | Promise<object> | any;
  name?: string | number | null | false;
  theme?: ThemeKeys | ThemeObject;
  style?: React.CSSProperties;
  iconStyle?: IconStyle;
  indentWidth?: number;
  collapsed?: boolean | number;
  collapseStringsAfterLength?: number | false;
  shouldCollapse?: false | ((field: CollapsedFieldProps) => boolean);
  groupArraysAfterLength?: number | false;
  displayObjectSize?: boolean;
  displayDataTypes?: boolean;
  quotesOnKeys?: boolean;
  sortKeys?: boolean;
  displayArrayKey?: boolean;
  defaultValue?: TypeDefaultValue | TypeDefaultValue[] | null;
  onSelect?: ((select: OnSelectProps) => void) | false;
  plugins?: JsonViewPlugin[];
  [key: string]: any;
}

export interface ReactJsonViewProps {
  /**
   * This property contains your input JSON.
   * Supports passing a Promise directly in React 19 to unwrap with use() inside Suspense.
   *
   * Required.
   */
  src: object | Promise<object>;
  /**
   * Contains the name of your root node. Use null or false for no name.
   *
   * Default: "root"
   */
  name?: string | null | false;
  /**
   * RJV supports base-16 themes. Check out the list of supported themes in the demo.
   * A custom "rjv-default" theme applies by default.
   *
   * Default: "rjv-default"
   */
  theme?: ThemeKeys | ThemeObject;
  /**
   * Style attributes for react-json-view-next container.
   * Explicit style attributes will override attributes provided by a theme.
   */
  style?: React.CSSProperties;
  /**
   * Style of expand/collapse icons. Accepted values are "circle", "triangle" or "square".
   *
   * Default: "triangle"
   */
  iconStyle?: IconStyle;
  /**
   * Set the indent-width for nested objects.
   *
   * Default: 4
   */
  indentWidth?: number;
  /**
   * When set to true, all nodes will be collapsed by default.
   * Use an integer value to collapse at a particular depth.
   *
   * Default: false
   */
  collapsed?: boolean | number;
  /**
   * When an integer value is assigned, strings will be cut off at that length.
   * Collapsed strings are followed by an ellipsis.
   * String content can be expanded and collapsed by clicking on the string value.
   *
   * Default: false
   */
  collapseStringsAfterLength?: number | false;
  /**
   * Callback function to provide control over what objects and arrays should be collapsed by default.
   * An object is passed to the callback containing name, src, type ("array" or "object") and namespace.
   *
   * Default: false
   */
  shouldCollapse?: false | ((field: CollapsedFieldProps) => boolean);
  /**
   * When an integer value is assigned, arrays will be displayed in groups by count of the value.
   * Groups are displayed with bracket notation and can be expanded and collapsed by clicking on the brackets.
   *
   * Default: 100
   */
  groupArraysAfterLength?: number | false;
  /**
   * When prop is not false, the user can copy objects and arrays to clipboard by clicking on the clipboard icon.
   * Copy callbacks are supported.
   *
   * Default: true
   */
  enableClipboard?: boolean | ((copy: OnCopyProps) => void);
  /**
   * When set to true, objects and arrays are labeled with size.
   *
   * Default: true
   */
  displayObjectSize?: boolean;
  /**
   * When set to true, data type labels prefix values.
   *
   * Default: true
   */
  displayDataTypes?: boolean;
  /**
   * set to false to remove quotes from keys (eg. "name": vs. name:)
   *
   * Default: true
   */
  quotesOnKeys?: boolean;
  /**
   * When a callback function is passed in, edit functionality is enabled.
   * The callback is invoked before edits are completed. Returning false
   * from onEdit will prevent the change from being made. see: onEdit docs.
   *
   * Default: false
   */
  onEdit?: ((edit: InteractionProps) => false | unknown) | false;
  /**
   * When a callback function is passed in, add functionality is enabled.
   * The callback is invoked before additions are completed.
   * Returning false from onAdd will prevent the change from being made. see: onAdd docs
   *
   * Default: false
   */
  onAdd?: ((add: InteractionProps) => false | unknown) | false;
  /**
   * When a callback function is passed in, delete functionality is enabled.
   * The callback is invoked before deletions are completed.
   * Returning false from onDelete will prevent the change from being made. see: onDelete docs
   *
   * Default: false
   */
  onDelete?: ((del: InteractionProps) => false | unknown) | false;
  /**
   * When a function is passed in, clicking a value triggers the onSelect method to be called.
   *
   * Default: false
   */
  onSelect?: ((select: OnSelectProps) => void) | false;
  /**
   * Custom message for validation failures to onEdit, onAdd, or onDelete callbacks.
   *
   * Default: "Validation Error"
   */
  validationMessage?: string;
  /**
   * Set to true to sort object keys.
   *
   * Default: false
   */
  sortKeys?: boolean;
  /**
   * Set to a value to be used as defaultValue when adding new key to json
   *
   * Default: null
   */
  defaultValue?: TypeDefaultValue | TypeDefaultValue[] | null;
  /**
   * When set to true, array keys (indices) are displayed.
   *
   * Default: true
   */
  displayArrayKey?: boolean;
}
