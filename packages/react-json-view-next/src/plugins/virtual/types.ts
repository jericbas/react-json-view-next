import type React from 'react';

export interface VirtualPluginOptions {
  /** Height in pixels of each row item (default: 24) */
  itemHeight?: number;
  /** Maximum viewport container height in pixels or CSS string (default: 400) */
  maxHeight?: number | string;
  /** Number of buffer items rendered above/below visible viewport (default: 5) */
  overscan?: number;
  /** Indentation multiplier per depth level (default: 4) */
  indentWidth?: number;
  /** Initial tree depth that starts expanded (default: 1) */
  defaultExpandedDepth?: number;
  /** Custom container styling */
  style?: React.CSSProperties;
}

export interface FlatRow {
  id: string;
  key: string;
  value: any;
  depth: number;
  type: 'object' | 'array' | 'primitive';
  isContainer: boolean;
  isExpanded: boolean;
  hasChildren: boolean;
  itemCount?: number;
  isClosingBrace?: boolean;
  namespace: Array<string | number | null>;
}
