import { evaluateJsonPath } from './jsonPath';
import type { SearchPluginOptions, SearchState } from './types';

export class SearchStore {
  private state: SearchState;
  private listeners: Set<() => void> = new Set();
  private options: SearchPluginOptions;

  constructor(options: SearchPluginOptions = {}) {
    this.options = options;
    this.state = {
      query: options.query || '',
      caseSensitive: options.caseSensitive ?? false,
      jsonPathMode: options.jsonPath ?? false,
      filterMode: options.filter ?? false,
      matchCount: 0,
      matches: new Map()
    };
  }

  getState(): SearchState {
    return this.state;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.state = { ...this.state, matches: new Map(this.state.matches) };
    for (const listener of this.listeners) {
      listener();
    }
    this.options.onSearch?.(this.state.query, this.state.matchCount);
  }

  setQuery(query: string, src?: any): void {
    this.state.query = query;
    this.recompute(src);
  }

  toggleCaseSensitive(src?: any): void {
    this.state.caseSensitive = !this.state.caseSensitive;
    this.recompute(src);
  }

  toggleJsonPathMode(src?: any): void {
    this.state.jsonPathMode = !this.state.jsonPathMode;
    this.recompute(src);
  }

  toggleFilterMode(src?: any): void {
    this.state.filterMode = !this.state.filterMode;
    this.recompute(src);
  }

  recompute(src?: any): void {
    const { query, caseSensitive, jsonPathMode } = this.state;
    this.state.matches.clear();

    if (!query || query.trim() === '' || src === undefined) {
      this.state.matchCount = 0;
      this.notify();
      return;
    }

    if (jsonPathMode && query.startsWith('$')) {
      const results = evaluateJsonPath(src, query);
      for (const res of results) {
        this.state.matches.set(res.path, {
          path: res.path,
          value: res.value,
          matchType: 'jsonpath'
        });
      }
      this.state.matchCount = results.length;
    } else {
      this.searchTree(src, 'root', query, caseSensitive);
      this.state.matchCount = this.state.matches.size;
    }

    this.notify();
  }

  private searchTree(node: any, path: string, query: string, caseSensitive: boolean): void {
    if (node === undefined || node === null) return;

    if (typeof node === 'object') {
      const isArr = Array.isArray(node);
      for (const [key, val] of Object.entries(node)) {
        const nextPath = isArr ? `${path}[${key}]` : `${path}.${key}`;
        const searchKeys = this.options.searchKeys ?? true;
        const searchVals = this.options.searchValues ?? true;

        if (searchKeys && this.stringMatches(key, query, caseSensitive)) {
          this.state.matches.set(nextPath, {
            path: nextPath,
            key,
            value: val,
            matchType: 'key'
          });
        }

        if (val !== null && typeof val === 'object') {
          this.searchTree(val, nextPath, query, caseSensitive);
        } else if (searchVals && this.stringMatches(String(val), query, caseSensitive)) {
          this.state.matches.set(nextPath, {
            path: nextPath,
            key,
            value: val,
            matchType: 'value'
          });
        }
      }
    }
  }

  stringMatches(str: string, q: string, caseSensitive: boolean): boolean {
    if (!str || !q) return false;
    if (caseSensitive) {
      return str.includes(q);
    }
    return str.toLowerCase().includes(q.toLowerCase());
  }

  isPathMatched(path: string): boolean {
    return this.state.matches.has(path);
  }
}
