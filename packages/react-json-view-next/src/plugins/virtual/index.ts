import React from 'react';
import type { JsonViewPlugin, TreeRenderContext } from '../../types';
import { flattenTree } from './TreeFlatten';
import type { FlatRow, VirtualPluginOptions } from './types';
import VirtualViewport from './VirtualViewport';

/**
 * Creates a virtualization plugin that flattens expanded JSON nodes into a 1D
 * array of rows and renders only the visible viewport items, supporting 100k+ nodes.
 *
 * @param options - Configuration options for item height, overscan, and viewport
 * @returns JsonViewPlugin instance
 */
export function withVirtualizer(options: VirtualPluginOptions = {}): JsonViewPlugin {
  return {
    name: 'virtualizer',
    renderTree: ({ src, name }: TreeRenderContext) =>
      React.createElement(VirtualViewport, { src, name, options })
  };
}

export type { FlatRow, VirtualPluginOptions };
export { flattenTree, VirtualViewport };
export default withVirtualizer;
