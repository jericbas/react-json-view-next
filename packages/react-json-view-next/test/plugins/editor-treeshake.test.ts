import { describe, expect, it } from 'vitest';
import * as editorPlugin from '../../src/plugins/editor';

describe('Tree-Shaking & Module Isolation for withEditor', () => {
  it('exports withEditor and granular factories', () => {
    expect(typeof editorPlugin.withEditor).toBe('function');
    expect(typeof editorPlugin.withEdit).toBe('function');
    expect(typeof editorPlugin.withAdd).toBe('function');
    expect(typeof editorPlugin.withDelete).toBe('function');
    expect(typeof editorPlugin.updateSrc).toBe('function');
    expect(typeof editorPlugin.parseInput).toBe('function');
    expect(typeof editorPlugin.stringifyVariable).toBe('function');
    expect(typeof editorPlugin.getEditorStyle).toBe('function');
  });

  it('ensures plugins/editor does not expose any Base16 theme objects', () => {
    const exportedKeys = Object.keys(editorPlugin);

    expect(exportedKeys).not.toContain('base16Themes');
    expect(exportedKeys).not.toContain('themesPart1');
    expect(exportedKeys).not.toContain('themesPart2');
    expect(exportedKeys).not.toContain('themesPart3');
    expect(exportedKeys).not.toContain('themesPart4');
    expect(exportedKeys).not.toContain('themesPopular1');
    expect(exportedKeys).not.toContain('themesCustom');
    expect(exportedKeys).not.toContain('themesInverted');
  });

  it('instantiates plugin with editor slots and methods', () => {
    const plugin = editorPlugin.withEditor();

    expect(plugin.name).toBe('editor');
    expect(typeof plugin.renderRowActions).toBe('function');
    expect(typeof plugin.renderValue).toBe('function');
    expect(typeof plugin.renderRootOverlay).toBe('function');
    expect(typeof plugin.onValueClick).toBe('function');
    expect(typeof plugin.isEditing).toBe('function');
    expect(plugin.renderTree).toBeUndefined();
  });

  it('getEditorStyle resolves default and grey styling correctly', () => {
    const defaultEditIcon = editorPlugin.getEditorStyle('rjv-default', 'editVarIcon');
    expect(defaultEditIcon.style.color).toBe('#2aa198');

    const greyEditIcon = editorPlugin.getEditorStyle('rjv-grey', 'editVarIcon');
    expect(greyEditIcon.style.color).toBe('rgba(1, 1, 1, 0.8)');

    const customThemeStyle = editorPlugin.getEditorStyle(
      {
        base00: '#111',
        base0E: '#ff00ff'
      } as any,
      'editVarIcon'
    );
    expect(customThemeStyle.style.color).toBe('#ff00ff');
  });
});
