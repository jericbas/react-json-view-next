import React, { useSyncExternalStore } from 'react';
import type { JsonViewPlugin, RootOverlayContext, ValueRenderContext } from '../../types';
import { highlightText } from './highlight';
import { evaluateJsonPath } from './jsonPath';
import SearchBar from './SearchBar';
import { SearchStore } from './searchStore';
import type { SearchMatch, SearchPluginOptions, SearchState } from './types';

interface SearchValueProps {
  store: SearchStore;
  variable: any;
  highlightColor?: string | undefined;
  defaultRender: () => React.ReactNode;
}

const SearchValue: React.FC<SearchValueProps> = ({
  store,
  variable,
  highlightColor,
  defaultRender
}) => {
  const state = useSyncExternalStore(
    cb => store.subscribe(cb),
    () => store.getState()
  );
  const { query, caseSensitive, jsonPathMode } = state;

  if (!query || query.trim() === '' || (jsonPathMode && query.startsWith('$'))) {
    return React.createElement(React.Fragment, null, defaultRender());
  }

  const valStr = String(variable.value);
  if (store.stringMatches(valStr, query, caseSensitive)) {
    return React.createElement(
      'span',
      { className: 'rjv-search-match' },
      highlightText(valStr, query, caseSensitive, highlightColor)
    );
  }

  return React.createElement(React.Fragment, null, defaultRender());
};

/**
 * Creates a search plugin that renders a search bar overlay and highlights
 * key/value matches or JSONPath query results across the JSON tree.
 *
 * @param options - Configuration options for search and filtering behavior
 * @returns JsonViewPlugin instance
 */
export function withSearch(options: SearchPluginOptions = {}): JsonViewPlugin {
  const store = new SearchStore(options);

  return {
    name: 'search',
    renderRootOverlay: ({ src }: RootOverlayContext) =>
      React.createElement(SearchBar, { store, src, options }),
    renderValue: ({ variable, defaultRender }: ValueRenderContext) =>
      React.createElement(SearchValue, {
        store,
        variable,
        highlightColor: options.highlightColor,
        defaultRender
      })
  };
}

export type { SearchMatch, SearchPluginOptions, SearchState };
export { evaluateJsonPath, highlightText, SearchBar, SearchStore };
export default withSearch;
