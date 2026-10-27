import type React from 'react';
import type { ThemeKeys, ThemeObject } from '../types';
import { rjv_default, rjv_grey } from './base16/rjv-themes';
import { getDefaultThemeStyling } from './defaultThemeStyling';
import {
  clearRegisteredThemes,
  getRegisteredTheme,
  registerTheme,
  registerThemes,
  useThemeRegistry
} from './themeRegistry';

export {
  clearRegisteredThemes,
  getRegisteredTheme,
  registerTheme,
  registerThemes,
  useThemeRegistry
};

export interface StyleResult {
  style: React.CSSProperties;
  [key: string]: any;
}

function resolveTheme(theme?: ThemeKeys | ThemeObject | boolean): ThemeObject {
  if (theme === false || theme === 'none') {
    return rjv_grey;
  }
  if (typeof theme === 'string') {
    if (theme === 'rjv-default') return rjv_default;
    if (theme === 'rjv-grey') return rjv_grey;
    const registered = getRegisteredTheme(theme);
    if (registered) return registered;
    return rjv_default;
  }
  if (theme && typeof theme === 'object') {
    if ('base00' in theme) {
      return { ...rjv_default, ...theme };
    }
  }
  return rjv_default;
}

export const getStyle = (theme?: ThemeKeys | ThemeObject | boolean) => {
  return (component: string, args?: any) => style(theme, component, args);
};

export default function style(
  theme: ThemeKeys | ThemeObject | boolean | undefined,
  component: string,
  args?: any
): StyleResult {
  if (!theme) {
    console.error('theme has not been set');
  }

  const resolvedTheme = resolveTheme(theme);
  const stylingMap = getDefaultThemeStyling(resolvedTheme) as Record<string, any>;
  const defaultDef = stylingMap[component];

  let resultStyle: React.CSSProperties = {};

  if (typeof defaultDef === 'function') {
    const computed = defaultDef(component, args);
    resultStyle = { ...(computed?.style ?? {}) };
  } else if (defaultDef && typeof defaultDef === 'object') {
    resultStyle = { ...defaultDef };
  }

  if (theme && typeof theme === 'object' && !Array.isArray(theme)) {
    const customDef = (theme as Record<string, any>)[component];
    if (typeof customDef === 'function') {
      const customComputed = customDef(component, args);
      resultStyle = { ...resultStyle, ...(customComputed?.style ?? {}) };
    } else if (customDef && typeof customDef === 'object') {
      resultStyle = { ...resultStyle, ...customDef };
    }
  }

  return { style: resultStyle };
}
