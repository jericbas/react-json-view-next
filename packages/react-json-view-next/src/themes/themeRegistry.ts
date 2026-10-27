import type { ThemeObject } from '../types';

const themeRegistry = new Map<string, ThemeObject>();

export function registerTheme(name: string, theme: ThemeObject): void {
  themeRegistry.set(name, theme);
}

export function registerThemes(themes: Record<string, ThemeObject>): void {
  for (const [name, theme] of Object.entries(themes)) {
    themeRegistry.set(name, theme);
  }
}

export function getRegisteredTheme(name: string): ThemeObject | undefined {
  return themeRegistry.get(name);
}

export function clearRegisteredThemes(): void {
  themeRegistry.clear();
}

export function useThemeRegistry() {
  return {
    registerTheme,
    registerThemes,
    getRegisteredTheme,
    clearRegisteredThemes
  };
}
