import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonViewer from '../../src/components/JsonViewer';
import { flattenTree, withVirtualizer } from '../../src/plugins/virtual/index';

describe('Virtualization Plugin', () => {
  describe('flattenTree', () => {
    it('flattens primitive root', () => {
      const rows = flattenTree('test-string', 'root', new Set());
      expect(rows).toHaveLength(1);
      expect(rows[0]?.value).toBe('test-string');
      expect(rows[0]?.type).toBe('primitive');
    });

    it('flattens collapsed object with count indicator', () => {
      const data = { a: 1, b: 2, c: 3 };
      const rows = flattenTree(data, 'root', new Set());
      expect(rows).toHaveLength(1);
      expect(rows[0]?.isContainer).toBe(true);
      expect(rows[0]?.isExpanded).toBe(false);
      expect(rows[0]?.itemCount).toBe(3);
    });

    it('flattens expanded object including children and closing brace', () => {
      const data = { a: 1, b: 2 };
      const rows = flattenTree(data, 'root', new Set(['root']));
      expect(rows).toHaveLength(4); // root, a, b, root-closing
      expect(rows[0]?.isContainer).toBe(true);
      expect(rows[1]?.key).toBe('a');
      expect(rows[1]?.value).toBe(1);
      expect(rows[2]?.key).toBe('b');
      expect(rows[2]?.value).toBe(2);
      expect(rows[3]?.isClosingBrace).toBe(true);
    });

    it('handles 100,000 items efficiently without call stack overflow', () => {
      const largeArray = new Array(100000).fill(0).map((_, i) => ({ id: i }));
      const start = performance.now();
      const rows = flattenTree(largeArray, 'root', new Set(['root']));
      const elapsed = performance.now() - start;

      // 100k items + root + closing brace = 100,002 rows
      expect(rows).toHaveLength(100002);
      expect(elapsed).toBeLessThan(1000); // well under 1 second
    });
  });

  describe('withVirtualizer plugin integration', () => {
    it('renders virtual container for standard payload', () => {
      const data = { message: 'virtual test', num: 42 };
      const { container } = render(<JsonViewer src={data} plugins={[withVirtualizer()]} />);

      const virtualContainer = container.querySelector('.rjv-virtual-container');
      expect(virtualContainer).toBeInTheDocument();
      expect(screen.getByText(/virtual test/)).toBeInTheDocument();
    });

    it('toggles expansion when clicking container node', () => {
      const data = { nested: { secret: 'found' } };
      const { container } = render(
        <JsonViewer src={data} plugins={[withVirtualizer({ defaultExpandedDepth: 1 })]} />
      );

      // Child 'nested' starts collapsed because defaultExpandedDepth is 1
      expect(screen.queryByText(/found/)).not.toBeInTheDocument();

      // Find toggle button for nested object
      const toggleButtons = container.querySelectorAll('button');
      const nestedToggle = Array.from(toggleButtons).find(btn => btn.textContent === '▶');
      expect(nestedToggle).toBeDefined();

      if (nestedToggle) {
        fireEvent.click(nestedToggle);
        expect(screen.getByText(/found/)).toBeInTheDocument();
      }
    });

    it('smoothly mounts 10,000 rows rendering only visible viewport window', () => {
      const bigList = new Array(10000).fill(null).map((_, i) => `item-${i}`);
      const { container } = render(
        <JsonViewer
          src={bigList}
          plugins={[withVirtualizer({ itemHeight: 20, maxHeight: 200, overscan: 2 })]}
        />
      );

      // DOM contains only the virtual window slice + overscan (~15 rows), not 10,000 rows!
      const renderedRows = container.querySelectorAll(
        '.rjv-virtual-container div > div > div > div'
      );
      expect(renderedRows.length).toBeLessThan(50);
    });
  });
});
