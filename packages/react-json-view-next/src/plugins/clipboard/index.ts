import React from 'react';
import CopyToClipboard, { type CopyToClipboardProps } from '../../components/CopyToClipboard';
import type { JsonViewPlugin, OnCopyProps, RowActionContext } from '../../types';
import type { ClipboardContext, ClipboardFormat, ClipboardPluginOptions } from './types';

/**
 * Creates a clipboard plugin that injects a copy-to-clipboard action
 * into primitive and container row action slots.
 *
 * @param options - Configuration options for clipboard behavior
 * @returns JsonViewPlugin instance
 */
export function withClipboard(options: ClipboardPluginOptions = {}): JsonViewPlugin {
  return {
    name: 'clipboard',
    renderRowActions: ({
      variable,
      namespace,
      theme,
      hovered,
      depth,
      isEditing
    }: RowActionContext) =>
      React.createElement(CopyToClipboard, {
        rowHovered: hovered,
        hidden: Boolean(isEditing),
        theme,
        namespace,
        variable,
        src: variable.value,
        depth,
        copyPath: options.copyPath,
        format: options.format,
        callback: options.callback ?? options.copyCallback,
        clickCallback: options.callback ?? options.copyCallback
      })
  };
}

export { getClipboardStyle } from './style';
export { formatClipboardValue, formatPath } from './util';
export type {
  ClipboardContext,
  ClipboardFormat,
  ClipboardPluginOptions,
  CopyToClipboardProps,
  OnCopyProps
};
export { CopyToClipboard };
export default withClipboard;
