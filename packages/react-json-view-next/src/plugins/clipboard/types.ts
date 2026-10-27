import type { OnCopyProps } from '../../types';
import type { JsonVariable } from '../../types/variable';

export interface ClipboardContext {
  variable: JsonVariable;
  namespace: Array<string | number | null>;
  path: string;
  value: unknown;
  depth: number;
}

export type ClipboardFormat = 'value' | 'path' | ((context: ClipboardContext) => string);

export interface ClipboardPluginOptions {
  /**
   * Optional copy callback function invoked whenever an item is copied to the clipboard.
   * Also accepts boolean for legacy compatibility.
   */
  callback?: boolean | ((copy: OnCopyProps) => void) | undefined;
  /**
   * Alias for `callback`.
   */
  copyCallback?: boolean | ((copy: OnCopyProps) => void) | undefined;
  /**
   * When true, copies the object/property path instead of its value.
   */
  copyPath?: boolean | undefined;
  /**
   * Copy format specification:
   * - 'value': JSON-formatted value (default)
   * - 'path': Property/key path (e.g., 'user.profile.name' or 'items[0]')
   * - ((context: ClipboardContext) => string): Custom format function
   */
  format?: ClipboardFormat | undefined;
}
