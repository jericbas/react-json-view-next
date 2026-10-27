import type React from 'react';
import { rjv_default, rjv_grey } from '../../themes/base16/rjv-themes';
import constants from '../../themes/styleConstants';
import type { ThemeKeys, ThemeObject } from '../../types';

export function getClipboardStyle(
  theme: ThemeKeys | ThemeObject | boolean | undefined,
  component: 'copy-to-clipboard' | 'copy-icon' | 'copy-icon-copied'
): { style: React.CSSProperties } {
  let base0F = rjv_default.base0F;
  let base0D = rjv_default.base0D;

  if (theme === 'rjv-grey' || theme === 'none' || theme === false) {
    base0F = rjv_grey.base0F;
    base0D = rjv_grey.base0D;
  } else if (theme && typeof theme === 'object' && 'base00' in theme) {
    const themeObj = theme as ThemeObject;
    base0F = themeObj.base0F || base0F;
    base0D = themeObj.base0D || base0D;
  }

  let defaultStyle: React.CSSProperties = {};
  switch (component) {
    case 'copy-to-clipboard':
      defaultStyle = { cursor: constants.clipboardCursor };
      break;
    case 'copy-icon':
      defaultStyle = {
        color: base0F,
        fontSize: constants.iconFontSize,
        marginRight: constants.iconMarginRight,
        verticalAlign: 'top'
      };
      break;
    case 'copy-icon-copied':
      defaultStyle = {
        color: base0D,
        marginLeft: constants.clipboardCheckMarginLeft
      };
      break;
  }

  let overrideStyle: React.CSSProperties = {};
  if (theme && typeof theme === 'object' && !Array.isArray(theme)) {
    const custom = (theme as Record<string, any>)[component];
    if (typeof custom === 'function') {
      overrideStyle = custom(component)?.style ?? {};
    } else if (custom && typeof custom === 'object') {
      overrideStyle = custom;
    }
  }

  return { style: { ...defaultStyle, ...overrideStyle } };
}
