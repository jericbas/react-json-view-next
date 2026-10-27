import { beforeEach, describe, expect, it } from 'vitest';
import getStyle, {
  clearRegisteredThemes,
  registerTheme,
  registerThemes,
  useThemeRegistry
} from '../../src/themes/getStyle';
import { customThemes, monokai, popularThemes } from '../../src/themes/index';

describe('getStyle', () => {
  beforeEach(() => {
    clearRegisteredThemes();
  });

  it('test that default style is returned', () => {
    const style = getStyle('rjv-default', 'app-container');
    expect(style.style.cursor).toBe('default');
    expect(style.style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('test objectKeyVal return', () => {
    const style = getStyle('rjv-default', 'objectKeyVal', { paddingLeft: 10 });
    expect(style.style).toBeDefined();
  });

  it('test "none" and false theme resolve to rjv_grey', () => {
    const noneStyle = getStyle('none', 'app-container');
    expect(noneStyle.style).toBeDefined();
    expect(noneStyle.style.backgroundColor).toBe('rgba(1, 1, 1, 0)');

    const falseStyle = getStyle(false, 'app-container');
    expect(falseStyle.style).toBeDefined();
    expect(falseStyle.style.backgroundColor).toBe('rgba(1, 1, 1, 0)');
  });

  it('test unregistered theme name falls back to rjv-default', () => {
    const style = getStyle('unregistered-theme' as any, 'app-container');
    expect(style.style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('test registering and resolving a single theme (monokai)', () => {
    registerTheme('monokai', monokai);
    const style = getStyle('monokai', 'app-container');
    expect(style.style.backgroundColor).toBe('#272822');
  });

  it('test registering batch themes (popular themes)', () => {
    registerThemes(popularThemes);
    const expectedBackgrounds: Record<string, string> = {
      dracula: '#282a36',
      nord: '#2e3440',
      gruvbox: '#282828',
      onedark: '#282c34',
      catppuccin: '#1e1e2e',
      tokyonight: '#1a1b26',
      rosepine: '#191724',
      everforest: '#2d353b',
      synthwave: '#262335',
      nightowl: '#011627'
    };

    for (const [themeName, bg] of Object.entries(expectedBackgrounds)) {
      const style = getStyle(themeName as any, 'app-container');
      expect(style.style.backgroundColor).toBe(bg);
    }
  });

  it('test registering batch custom themes', () => {
    registerThemes(customThemes);
    const expectedBackgrounds: Record<string, string> = {
      aurora: '#07111a',
      matcha: '#141d17',
      nebula: '#0d091a',
      obsidian: '#111215',
      sakura: '#1c1219'
    };

    for (const [themeName, bg] of Object.entries(expectedBackgrounds)) {
      const style = getStyle(themeName as any, 'app-container');
      expect(style.style.backgroundColor).toBe(bg);
    }
  });

  it('test clearRegisteredThemes resets registry', () => {
    registerTheme('monokai', monokai);
    expect(getStyle('monokai', 'app-container').style.backgroundColor).toBe('#272822');
    clearRegisteredThemes();
    expect(getStyle('monokai', 'app-container').style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('test useThemeRegistry hook helper', () => {
    const registry = useThemeRegistry();
    registry.registerTheme('monokai', monokai);
    expect(registry.getRegisteredTheme('monokai')).toBe(monokai);
    registry.clearRegisteredThemes();
    expect(registry.getRegisteredTheme('monokai')).toBeUndefined();
  });

  it('test custom theme object with custom styling overrides', () => {
    const customTheme = {
      base00: '#112233',
      base01: '#223344',
      base02: '#334455',
      base03: '#445566',
      base04: '#556677',
      base05: '#667788',
      base06: '#778899',
      base07: '#8899aa',
      base08: '#99aabb',
      base09: '#aabbcc',
      base0A: '#bbccdd',
      base0B: '#ccddee',
      base0C: '#ddeeff',
      base0D: '#eeffff',
      base0E: '#ffffff',
      base0F: '#000000',
      'app-container': {
        color: 'purple'
      }
    };
    const style = getStyle(customTheme, 'app-container');
    expect(style.style.backgroundColor).toBe('#112233');
    expect(style.style.color).toBe('purple');
  });
});
