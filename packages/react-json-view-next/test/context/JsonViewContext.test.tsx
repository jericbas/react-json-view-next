import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { JsonViewState } from '../../src/context/JsonViewContext';
import { jsonViewReducer, useJsonView } from '../../src/context/JsonViewContext';
import { JsonViewProvider } from '../../src/context/JsonViewProvider';
import { deepCopy, updateSrc } from '../../src/helpers/updateSrc';

const ConsumerComponent = () => {
  const { name, theme, rjvId } = useJsonView();
  return (
    <div>
      <span data-testid="name">{name}</span>
      <span data-testid="theme">{String(theme)}</span>
      <span data-testid="id">{rjvId}</span>
    </div>
  );
};

describe('JsonViewContext & Reducer (Core)', () => {
  describe('deepCopy', () => {
    it('deeply copies objects along a namespace path', () => {
      const original = { a: { b: { c: 1 } }, d: 2 };
      const copied = deepCopy(original, ['a', 'b']);
      expect(copied).toEqual(original);
      expect(copied).not.toBe(original);
      expect(copied.a).not.toBe(original.a);
      expect(copied.a.b).not.toBe(original.a.b);
    });

    it('deeply copies arrays along a namespace path', () => {
      const original = [1, [2, [3]]];
      const copied = deepCopy(original, [1, 1]);
      expect(copied).toEqual(original);
      expect(copied).not.toBe(original);
      expect(copied[1]).not.toBe(original[1]);
    });
  });

  describe('updateSrc', () => {
    it('updates a variable in an object', () => {
      const src = { key1: 'old', key2: 'stay' };
      const updated = updateSrc(src, {
        name: 'key1',
        namespace: ['root'],
        new_value: 'new'
      });
      expect(updated).toEqual({ key1: 'new', key2: 'stay' });
      expect(src.key1).toBe('old');
    });

    it('removes a variable from an object', () => {
      const src = { key1: 'value1', key2: 'value2' };
      const updated = updateSrc(src, {
        name: 'key1',
        namespace: ['root'],
        variable_removed: true
      });
      expect(updated).toEqual({ key2: 'value2' });
    });

    it('removes a variable from an array', () => {
      const src = ['a', 'b', 'c'];
      const updated = updateSrc(src, {
        name: 1,
        namespace: ['root'],
        variable_removed: true
      });
      expect(updated).toEqual(['a', 'c']);
    });

    it('updates root value when name is null', () => {
      const src = 'old';
      const updated = updateSrc(src, {
        name: null,
        namespace: ['root'],
        new_value: 'new'
      });
      expect(updated).toBe('new');
    });
  });

  describe('jsonViewReducer', () => {
    const initialState: JsonViewState = {
      src: { name: 'test', count: 0 },
      name: 'root',
      theme: 'rjv-default',
      expanded: {},
      collapsed: {},
      plugins: [],
      rjvId: 'test-id'
    };

    it('handles SET_EXPANDED and TOGGLE_EXPANDED', () => {
      let state = jsonViewReducer(initialState, {
        type: 'SET_EXPANDED',
        payload: { key: 'root.item', expanded: true }
      });
      expect(state.expanded['root.item']).toBe(true);

      state = jsonViewReducer(state, {
        type: 'TOGGLE_EXPANDED',
        payload: { key: 'root.item' }
      });
      expect(state.expanded['root.item']).toBe(false);
    });

    it('handles RESET_PROPS', () => {
      const state = jsonViewReducer(initialState, {
        type: 'RESET_PROPS',
        payload: {
          src: { fresh: true },
          name: 'newRoot'
        }
      });
      expect(state.src).toEqual({ fresh: true });
      expect(state.name).toBe('newRoot');
    });
  });

  describe('JsonViewProvider and useJsonView hook', () => {
    it('reads context values and provides helpers', () => {
      render(
        <JsonViewProvider src={{ test: 123 }} name="custom-root" theme="monokai">
          <ConsumerComponent />
        </JsonViewProvider>
      );
      expect(screen.getByTestId('name')).toHaveTextContent('custom-root');
      expect(screen.getByTestId('theme')).toHaveTextContent('monokai');
      expect(screen.getByTestId('id')).not.toBeEmptyDOMElement();
    });
  });
});
