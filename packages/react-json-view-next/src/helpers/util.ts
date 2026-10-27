import type { ThemeObject } from '../types';

export function toType(obj: unknown): string {
  let type = getType(obj);
  // some extra disambiguation for numbers
  if (type === 'number') {
    const num = obj as number;
    if (Number.isNaN(num)) {
      type = 'nan';
    } else if ((num | 0) !== num) {
      //bitwise OR produces integers
      type = 'float';
    } else {
      type = 'integer';
    }
  }
  return type;
}

function getType(obj: unknown): string {
  const match = {}.toString.call(obj).match(/\s([a-zA-Z]+)/);
  return match?.[1] ? match[1].toLowerCase() : '';
}

const themeKeys = [
  'base00',
  'base01',
  'base02',
  'base03',
  'base04',
  'base05',
  'base06',
  'base07',
  'base08',
  'base09',
  'base0A',
  'base0B',
  'base0C',
  'base0D',
  'base0E',
  'base0F'
] as const;

export function isTheme(theme: unknown): theme is ThemeObject {
  if (toType(theme) === 'object' && theme !== null) {
    const t = theme as Record<string, unknown>;
    for (let i = 0; i < themeKeys.length; i++) {
      const key = themeKeys[i];
      if (key !== undefined && !(key in t)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
