import type React from 'react';

export interface SearchPluginOptions {
  /** Initial query string */
  query?: string;
  /** Whether search is case-sensitive (default: false) */
  caseSensitive?: boolean;
  /** Enable JSONPath querying (e.g. $.items[*].name) */
  jsonPath?: boolean;
  /** Filter non-matching nodes from view (default: false) */
  filter?: boolean;
  /** Background color for highlighted matches */
  highlightColor?: string;
  /** Callback fired on query or match count change */
  onSearch?: (query: string, matchCount: number) => void;
  /** Search in key names (default: true) */
  searchKeys?: boolean;
  /** Search in primitive values (default: true) */
  searchValues?: boolean;
  /** Placeholder text for search input */
  placeholder?: string;
  /** Custom CSS style for search bar container */
  style?: React.CSSProperties;
}

export interface SearchMatch {
  path: string;
  key?: string;
  value?: any;
  matchType: 'key' | 'value' | 'jsonpath';
}

export interface SearchState {
  query: string;
  caseSensitive: boolean;
  jsonPathMode: boolean;
  filterMode: boolean;
  matchCount: number;
  matches: Map<string, SearchMatch>;
}
