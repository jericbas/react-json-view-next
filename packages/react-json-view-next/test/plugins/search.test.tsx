import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import JsonViewer from '../../src/components/JsonViewer';
import {
  evaluateJsonPath,
  highlightText,
  SearchStore,
  withSearch
} from '../../src/plugins/search/index';

describe('Search Plugin', () => {
  describe('evaluateJsonPath', () => {
    const data = {
      store: {
        books: [
          { id: 1, title: 'Book A', author: 'Author X' },
          { id: 2, title: 'Book B', author: 'Author Y' }
        ],
        meta: { currency: 'USD' }
      }
    };

    it('evaluates direct property paths', () => {
      const res = evaluateJsonPath(data, '$.store.meta.currency');
      expect(res).toHaveLength(1);
      expect(res[0]?.value).toBe('USD');
    });

    it('evaluates array indexing', () => {
      const res = evaluateJsonPath(data, '$.store.books[0].title');
      expect(res).toHaveLength(1);
      expect(res[0]?.value).toBe('Book A');
    });

    it('evaluates wildcard array expressions', () => {
      const res = evaluateJsonPath(data, '$.store.books[*].id');
      expect(res).toHaveLength(2);
      expect(res[0]?.value).toBe(1);
      expect(res[1]?.value).toBe(2);
    });

    it('evaluates recursive descent ($..author)', () => {
      const res = evaluateJsonPath(data, '$..author');
      expect(res).toHaveLength(2);
      expect(res.map(r => r.value)).toEqual(['Author X', 'Author Y']);
    });

    it('returns empty array on invalid expressions', () => {
      expect(evaluateJsonPath(data, 'invalid.path')).toEqual([]);
      expect(evaluateJsonPath(data, '')).toEqual([]);
    });
  });

  describe('SearchStore', () => {
    it('finds key and value matches with case sensitivity options', () => {
      const data = { name: 'Alice', age: 30, city: 'alice-springs' };
      const store = new SearchStore();

      store.setQuery('Alice', data);
      expect(store.getState().matchCount).toBeGreaterThanOrEqual(1);

      store.toggleCaseSensitive(data);
      expect(store.getState().caseSensitive).toBe(true);

      store.setQuery('ALICE', data);
      expect(store.getState().matchCount).toBe(0);

      store.toggleCaseSensitive(data);
      store.recompute(data);
      expect(store.getState().matchCount).toBe(2);
    });

    it('invokes onSearch callback on query changes', () => {
      const onSearch = vi.fn();
      const store = new SearchStore({ onSearch });
      const data = { test: 'value' };

      store.setQuery('test', data);
      expect(onSearch).toHaveBeenCalledWith('test', expect.any(Number));
    });
  });

  describe('highlightText', () => {
    it('returns original string when query is empty', () => {
      expect(highlightText('hello world', '')).toBe('hello world');
    });

    it('wraps matched substring in mark elements', () => {
      const { container } = render(<div>{highlightText('Antigravity Python SDK', 'Python')}</div>);
      const mark = container.querySelector('mark');
      expect(mark).toBeInTheDocument();
      expect(mark).toHaveTextContent('Python');
    });
  });

  describe('withSearch plugin integration', () => {
    it('renders search bar overlay and highlights matches', () => {
      const data = { message: 'hello world', count: 100 };
      const { container } = render(
        <JsonViewer src={data} plugins={[withSearch({ query: 'hello' })]} />
      );

      const searchInput = container.querySelector('input');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput?.value).toBe('hello');

      const mark = container.querySelector('mark');
      expect(mark).toBeInTheDocument();
      expect(mark).toHaveTextContent('hello');
    });

    it('updates query dynamically on user input and allows clear', () => {
      const data = { title: 'React 19 Viewer' };
      const { container } = render(<JsonViewer src={data} plugins={[withSearch()]} />);

      const searchInput = screen.getByPlaceholderText(/search/i);
      fireEvent.change(searchInput, { target: { value: 'Viewer' } });

      const mark = container.querySelector('mark');
      expect(mark).toBeInTheDocument();
      expect(mark).toHaveTextContent('Viewer');

      const clearBtn = screen.getByTitle('Clear search');
      fireEvent.click(clearBtn);
      expect(container.querySelector('mark')).not.toBeInTheDocument();
    });
  });
});
