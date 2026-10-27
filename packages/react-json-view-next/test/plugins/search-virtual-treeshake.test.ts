import { describe, expect, it } from 'vitest';
import * as CoreExports from '../../src/index';
import * as SearchExports from '../../src/plugins/search/index';
import * as VirtualExports from '../../src/plugins/virtual/index';

describe('Search and Virtual Plugins Tree-Shaking', () => {
  it('ensures Core does not export search or virtual plugin symbols', () => {
    const exportedKeys = Object.keys(CoreExports);

    expect(exportedKeys).not.toContain('withSearch');
    expect(exportedKeys).not.toContain('SearchBar');
    expect(exportedKeys).not.toContain('withVirtualizer');
    expect(exportedKeys).not.toContain('flattenTree');
    expect(exportedKeys).not.toContain('VirtualViewport');
  });

  it('ensures plugins/search exports search suite', () => {
    expect(typeof SearchExports.withSearch).toBe('function');
    expect(SearchExports.SearchBar).toBeDefined();
    expect(SearchExports.SearchStore).toBeDefined();
    expect(typeof SearchExports.highlightText).toBe('function');
    expect(typeof SearchExports.evaluateJsonPath).toBe('function');
  });

  it('ensures plugins/virtual exports virtualization suite', () => {
    expect(typeof VirtualExports.withVirtualizer).toBe('function');
    expect(VirtualExports.VirtualViewport).toBeDefined();
    expect(typeof VirtualExports.flattenTree).toBe('function');
  });
});
