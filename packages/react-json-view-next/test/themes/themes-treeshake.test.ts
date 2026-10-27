import { describe, expect, it } from 'vitest';
import * as CoreExports from '../../src/index';
import * as ThemesExports from '../../src/themes/index';

describe('Themes Tree-Shaking and Decoupling Verification', () => {
  it('ensures Core does not export or bundle Base16 theme dictionaries', () => {
    const exportedKeys = Object.keys(CoreExports);

    expect(exportedKeys).not.toContain('base16Themes');
    expect(exportedKeys).not.toContain('originalBase16Themes');
    expect(exportedKeys).not.toContain('popularThemes');
    expect(exportedKeys).not.toContain('customThemes');
    expect(exportedKeys).not.toContain('monokai');
    expect(exportedKeys).not.toContain('dracula');
    expect(exportedKeys).not.toContain('nord');
  });

  it('ensures themes subpath exports base16Themes and individual themes', () => {
    expect(ThemesExports.base16Themes).toBeDefined();
    expect(ThemesExports.monokai).toBeDefined();
    expect(ThemesExports.monokai.base00).toBe('#272822');
    expect(ThemesExports.dracula).toBeDefined();
    expect(ThemesExports.dracula.base00).toBe('#282a36');
    expect(ThemesExports.nord).toBeDefined();
    expect(ThemesExports.nord.base00).toBe('#2e3440');
    expect(typeof ThemesExports.registerAllThemes).toBe('function');
  });

  it('ensures Core exposes theme registration helpers', () => {
    expect(typeof CoreExports.registerTheme).toBe('function');
    expect(typeof CoreExports.registerThemes).toBe('function');
    expect(typeof CoreExports.getRegisteredTheme).toBe('function');
    expect(typeof CoreExports.clearRegisteredThemes).toBe('function');
    expect(typeof CoreExports.useThemeRegistry).toBe('function');
  });
});
