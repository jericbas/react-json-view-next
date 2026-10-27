import { describe, expect, it } from 'vitest';
import * as clipboardPlugin from '../../src/plugins/clipboard';

describe('Tree-Shaking & Module Isolation for withClipboard', () => {
  it('exports withClipboard and related helpers without exporting editor modules', () => {
    expect(typeof clipboardPlugin.withClipboard).toBe('function');
    expect(typeof clipboardPlugin.CopyToClipboard).toBe('function');
    expect(typeof clipboardPlugin.formatPath).toBe('function');
    expect(typeof clipboardPlugin.formatClipboardValue).toBe('function');
    expect(typeof clipboardPlugin.getClipboardStyle).toBe('function');
  });

  it('ensures plugins/clipboard does not expose any editor or Base16 theme objects', () => {
    const exportedKeys = Object.keys(clipboardPlugin);

    expect(exportedKeys).not.toContain('VariableEditor');
    expect(exportedKeys).not.toContain('VariableActionIcons');
    expect(exportedKeys).not.toContain('ObjectKeyModal');
    expect(exportedKeys).not.toContain('base16Themes');
    expect(exportedKeys).not.toContain('themesPart1');
    expect(exportedKeys).not.toContain('themesPart2');
    expect(exportedKeys).not.toContain('themesPopular1');
    expect(exportedKeys).not.toContain('themesCustom');
  });

  it('instantiates plugin strictly with renderRowActions slot only', () => {
    const plugin = clipboardPlugin.withClipboard();

    expect(plugin.name).toBe('clipboard');
    expect(typeof plugin.renderRowActions).toBe('function');
    expect(plugin.renderValue).toBeUndefined();
    expect(plugin.renderTree).toBeUndefined();
    expect(plugin.renderRootOverlay).toBeUndefined();
  });

  it('getClipboardStyle resolves default and custom themes without base16 loader', () => {
    const defaultIconStyle = clipboardPlugin.getClipboardStyle('rjv-default', 'copy-icon');
    expect(defaultIconStyle.style.color).toBe('#268bd2');

    const greyIconStyle = clipboardPlugin.getClipboardStyle('rjv-grey', 'copy-icon');
    expect(greyIconStyle.style.color).toBe('rgba(1, 1, 1, 0.8)');

    const customThemeStyle = clipboardPlugin.getClipboardStyle(
      {
        base00: '#111',
        base0F: '#ff0000',
        base0D: '#00ff00'
      } as any,
      'copy-icon'
    );
    expect(customThemeStyle.style.color).toBe('#ff0000');
  });
});
