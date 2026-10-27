import type React from 'react';
import { useMemo, useState } from 'react';
import { flattenTree } from './TreeFlatten';
import type { FlatRow, VirtualPluginOptions } from './types';

export interface VirtualViewportProps {
  src: any;
  name?: string | number | null | false;
  options?: VirtualPluginOptions;
}

export const VirtualViewport: React.FC<VirtualViewportProps> = ({
  src,
  name = 'root',
  options = {}
}) => {
  const {
    itemHeight = 24,
    maxHeight = 400,
    overscan = 5,
    indentWidth = 4,
    defaultExpandedDepth = 1,
    style
  } = options;

  const [scrollTop, setScrollTop] = useState(0);
  const [expandedSet, setExpandedSet] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (defaultExpandedDepth >= 1) initial.add('root');
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allRows = useMemo(() => flattenTree(src, name, expandedSet), [src, name, expandedSet]);

  const numHeight = typeof maxHeight === 'number' ? maxHeight : 400;
  const totalHeight = allRows.length * itemHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    allRows.length,
    Math.ceil((scrollTop + numHeight) / itemHeight) + overscan
  );
  const visibleRows = allRows.slice(startIndex, endIndex);

  return (
    <div
      className="rjv-virtual-container"
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
      style={{
        maxHeight,
        height: Math.min(totalHeight, numHeight),
        overflowY: 'auto',
        position: 'relative',
        fontFamily: 'monospace',
        fontSize: '12px',
        ...style
      }}
    >
      <div style={{ height: totalHeight, width: '100%', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: `translateY(${startIndex * itemHeight}px)`
          }}
        >
          {visibleRows.map(row => renderRow(row, itemHeight, indentWidth, toggleExpand))}
        </div>
      </div>
    </div>
  );
};

function renderRow(
  row: FlatRow,
  itemHeight: number,
  indentWidth: number,
  toggleExpand: (id: string) => void
): React.ReactNode {
  const paddingLeft = row.depth * indentWidth * 6;

  if (row.isClosingBrace) {
    return (
      <div key={row.id} style={{ height: itemHeight, lineHeight: `${itemHeight}px`, paddingLeft }}>
        <span style={{ fontWeight: 'bold' }}>{String(row.value)}</span>
      </div>
    );
  }

  if (row.isContainer) {
    return (
      <div
        key={row.id}
        style={{
          height: itemHeight,
          lineHeight: `${itemHeight}px`,
          paddingLeft,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <button
          type="button"
          onClick={() => toggleExpand(row.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontSize: '10px',
            color: 'inherit',
            opacity: 0.7
          }}
        >
          {row.isExpanded ? '▼' : '▶'}
        </button>
        {row.key && <span style={{ color: '#002b36', fontWeight: 600 }}>{row.key}: </span>}
        <span style={{ fontWeight: 'bold' }}>{String(row.value)}</span>
        {!row.isExpanded && row.itemCount !== undefined && (
          <span style={{ opacity: 0.5, fontSize: '11px', marginLeft: '4px' }}>
            {row.itemCount} {row.itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      key={row.id}
      style={{
        height: itemHeight,
        lineHeight: `${itemHeight}px`,
        paddingLeft: paddingLeft + 14,
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      {row.key && <span style={{ color: '#002b36' }}>{row.key}: </span>}
      {renderPrimitiveValue(row.value)}
    </div>
  );
}

function renderPrimitiveValue(value: any): React.ReactNode {
  if (value === null) return <span style={{ color: '#d33682' }}>null</span>;
  if (value === undefined) return <span style={{ opacity: 0.5 }}>undefined</span>;
  if (typeof value === 'string') return <span style={{ color: '#cb4b16' }}>"{value}"</span>;
  if (typeof value === 'number') return <span style={{ color: '#2aa198' }}>{value}</span>;
  if (typeof value === 'boolean') {
    return <span style={{ color: '#859900' }}>{value ? 'true' : 'false'}</span>;
  }
  return <span>{String(value)}</span>;
}

export default VirtualViewport;
