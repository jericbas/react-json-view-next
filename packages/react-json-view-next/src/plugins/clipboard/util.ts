import { toType } from '../../helpers/util';

/**
 * Formats a namespace array into a clean property path (e.g. 'user.profile.name' or 'items[0]').
 * Removes the root viewer identifier ('root' or null) when nested.
 */
export function formatPath(namespace: Array<string | number | null>): string {
  if (namespace.length === 0) return '';
  const segments = namespace.length > 1 ? namespace.slice(1) : namespace;
  let path = '';
  for (const segment of segments) {
    if (segment === null || segment === undefined) continue;
    if (typeof segment === 'number' || /^\d+$/.test(String(segment))) {
      path += `[${segment}]`;
    } else {
      const str = String(segment);
      if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(str)) {
        path = path ? `${path}.${str}` : str;
      } else {
        path = path ? `${path}[${JSON.stringify(str)}]` : JSON.stringify(str);
      }
    }
  }
  return path;
}

/**
 * Formats a value for copying to clipboard as JSON.
 * Converts functions and RegExp objects to string representations.
 */
export function formatClipboardValue(value: unknown): string {
  const type = toType(value);
  switch (type) {
    case 'function':
    case 'regexp':
      return (value as { toString(): string }).toString();
    case 'undefined':
      return 'undefined';
    default: {
      const stringified = JSON.stringify(value, null, '  ');
      return stringified !== undefined ? stringified : String(value);
    }
  }
}
