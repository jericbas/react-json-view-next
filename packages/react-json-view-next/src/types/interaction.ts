export type TypeDefaultValue = string | number | boolean | object;

export interface OnCopyProps {
  /**
   * The JSON tree source object
   */
  src: object | unknown[] | unknown;
  /**
   * List of keys.
   */
  namespace: Array<string | number | null>;
  /**
   * The last key in the namespace array.
   */
  name: string | number | null;
}

export interface CollapsedFieldProps {
  /**
   * The name of the entry.
   */
  name: string | number | null | false;
  /**
   * The corresponding JSON subtree.
   */
  src: object | unknown[] | unknown;
  /**
   * The type of src. Can only be "array" or "object".
   */
  type: 'array' | 'object' | string;
  /**
   * The scopes above the current entry.
   */
  namespace: Array<string | number | null>;
}

export interface InteractionProps {
  /**
   * The updated subtree of the JSON tree.
   */
  updated_src: object | unknown[] | unknown;
  /**
   * The existing subtree of the JSON tree.
   */
  existing_src: object | unknown[] | unknown;
  /**
   * The key of the entry that is interacted with.
   */
  name: string | number | null;
  /**
   * List of keys.
   */
  namespace: Array<string | number | null>;
  /**
   * The original value of the entry that is interacted with.
   */
  existing_value: unknown;
  /**
   * The updated value of the entry that is interacted with.
   */
  new_value?: unknown;
}

export interface OnSelectProps {
  /**
   * The name of the currently selected entry.
   */
  name: string | number | null;
  /**
   * The value of the currently selected entry.
   */
  value: unknown;
  /**
   * The type of the value. For "number" type, it will be replaced with the more
   * accurate types: "float", "integer", or "nan".
   */
  type: string;
  /**
   * List of keys representing the scopes above the selected entry.
   */
  namespace: Array<string | number | null>;
}
