import type React from 'react';
import { useSyncExternalStore } from 'react';
import type { SearchStore } from './searchStore';
import type { SearchPluginOptions } from './types';

export interface SearchBarProps {
  store: SearchStore;
  src: any;
  options: SearchPluginOptions;
}

export const SearchBar: React.FC<SearchBarProps> = ({ store, src, options }) => {
  const state = useSyncExternalStore(
    cb => store.subscribe(cb),
    () => store.getState()
  );

  const { query, matchCount, caseSensitive, jsonPathMode } = state;

  return (
    <div
      className="rjv-search-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 8px',
        marginBottom: '8px',
        borderRadius: '4px',
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        border: '1px solid rgba(128, 128, 128, 0.2)',
        fontSize: '12px',
        fontFamily: 'sans-serif',
        ...options.style
      }}
    >
      <span style={{ opacity: 0.6 }}>🔍</span>
      <input
        type="text"
        value={query}
        placeholder={options.placeholder || 'Search keys, values, or $.path...'}
        onChange={e => store.setQuery(e.target.value, src)}
        style={{
          flex: 1,
          padding: '4px 6px',
          fontSize: '12px',
          fontFamily: 'monospace',
          border: '1px solid rgba(128, 128, 128, 0.3)',
          borderRadius: '3px',
          backgroundColor: 'transparent',
          color: 'inherit',
          outline: 'none'
        }}
      />
      {query && (
        <button
          type="button"
          onClick={() => store.setQuery('', src)}
          title="Clear search"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: 0.6,
            fontSize: '14px',
            padding: '0 4px',
            color: 'inherit'
          }}
        >
          ✕
        </button>
      )}

      {query && (
        <span
          className="rjv-search-match-count"
          style={{
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '10px',
            backgroundColor: matchCount > 0 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
            color: matchCount > 0 ? '#4caf50' : '#f44336',
            fontWeight: 'bold'
          }}
        >
          {matchCount} {matchCount === 1 ? 'match' : 'matches'}
        </span>
      )}

      <button
        type="button"
        onClick={() => store.toggleCaseSensitive(src)}
        title="Match Case (Aa)"
        style={{
          background: caseSensitive ? 'rgba(33, 150, 243, 0.3)' : 'none',
          border: '1px solid rgba(128, 128, 128, 0.3)',
          borderRadius: '3px',
          cursor: 'pointer',
          padding: '2px 6px',
          fontSize: '11px',
          fontWeight: 'bold',
          color: caseSensitive ? '#2196f3' : 'inherit'
        }}
      >
        Aa
      </button>

      <button
        type="button"
        onClick={() => store.toggleJsonPathMode(src)}
        title="JSONPath Mode ($)"
        style={{
          background: jsonPathMode ? 'rgba(156, 39, 176, 0.3)' : 'none',
          border: '1px solid rgba(128, 128, 128, 0.3)',
          borderRadius: '3px',
          cursor: 'pointer',
          padding: '2px 6px',
          fontSize: '11px',
          fontWeight: 'bold',
          color: jsonPathMode ? '#ba68c8' : 'inherit'
        }}
      >
        $
      </button>
    </div>
  );
};

export default SearchBar;
