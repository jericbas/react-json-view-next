import type React from 'react';
import { rjv_default, rjv_grey } from '../../themes/base16/rjv-themes';
import constants from '../../themes/styleConstants';
import type { ThemeKeys, ThemeObject } from '../../types';

export function resolveEditorTheme(
  theme: ThemeKeys | ThemeObject | boolean | undefined
): ThemeObject {
  if (theme === 'rjv-grey' || theme === 'none' || theme === false) {
    return rjv_grey;
  }
  if (theme && typeof theme === 'object' && 'base00' in theme) {
    return theme as ThemeObject;
  }
  return rjv_default;
}

export function getEditorStylesMap(themeObj: ThemeObject): Record<string, React.CSSProperties> {
  const { base01, base05, base09, base0A, base0E } = themeObj;

  return {
    removeVarIcon: {
      verticalAlign: 'top',
      display: 'inline-block',
      color: base09,
      cursor: constants.iconCursor,
      fontSize: constants.iconFontSize,
      marginRight: constants.iconMarginRight
    },
    addVarIcon: {
      verticalAlign: 'top',
      display: 'inline-block',
      color: base0E,
      cursor: constants.iconCursor,
      fontSize: constants.iconFontSize,
      marginRight: constants.iconMarginRight
    },
    editVarIcon: {
      verticalAlign: 'top',
      display: 'inline-block',
      color: base0E,
      cursor: constants.iconCursor,
      fontSize: constants.iconFontSize,
      marginRight: constants.iconMarginRight
    },
    'edit-icon-container': {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    'check-icon': {
      display: 'inline-block',
      cursor: constants.iconCursor,
      color: base0E,
      fontSize: constants.iconFontSize,
      paddingRight: constants.iconPaddingRight
    },
    'cancel-icon': {
      display: 'inline-block',
      cursor: constants.iconCursor,
      color: base09,
      fontSize: constants.iconFontSize,
      paddingRight: constants.iconPaddingRight
    },
    'edit-input': {
      display: 'inline-block',
      minWidth: constants.editInputMinWidth,
      borderRadius: constants.editInputBorderRadius,
      backgroundColor: base01,
      color: base0A,
      padding: constants.editInputPadding,
      marginRight: constants.editInputMarginRight,
      fontFamily: constants.editInputFontFamily
    },
    'detected-row': {
      paddingTop: constants.detectedRowPaddingTop
    },
    'key-modal-request': {
      position: constants.addKeyCoverPosition as any,
      top: constants.addKeyCoverPositionPx,
      left: constants.addKeyCoverPositionPx,
      right: constants.addKeyCoverPositionPx,
      bottom: constants.addKeyCoverPositionPx,
      backgroundColor: constants.addKeyCoverBackground
    },
    'key-modal': {
      width: constants.addKeyModalWidth,
      backgroundColor: base05,
      marginLeft: constants.addKeyModalMargin,
      marginRight: constants.addKeyModalMargin,
      padding: constants.addKeyModalPadding,
      borderRadius: constants.addKeyModalRadius,
      marginTop: '15px',
      position: 'relative'
    },
    'key-modal-label': {
      color: base01,
      marginLeft: '2px',
      marginBottom: '5px',
      fontSize: '11px'
    },
    'key-modal-input-container': {
      overflow: 'hidden'
    },
    'key-modal-input': {
      width: '100%',
      padding: '3px 6px',
      fontFamily: 'monospace',
      color: base0A,
      border: 'none',
      boxSizing: 'border-box',
      borderRadius: '2px'
    },
    'key-modal-cancel': {
      backgroundColor: base09,
      position: 'absolute',
      top: '0px',
      right: '0px',
      borderRadius: '0px 3px 0px 3px',
      cursor: 'pointer'
    },
    'key-modal-cancel-icon': {
      color: base01,
      fontSize: constants.iconFontSize,
      transform: 'rotate(45deg)'
    },
    'key-modal-submit': {
      color: base0E,
      fontSize: constants.iconFontSize,
      position: 'absolute',
      right: '2px',
      top: '3px',
      cursor: 'pointer'
    },
    'validation-failure': {
      float: 'right',
      padding: '3px 6px',
      borderRadius: '2px',
      cursor: 'pointer',
      color: base01,
      backgroundColor: base09
    },
    'validation-failure-label': {
      marginRight: '6px'
    },
    'validation-failure-clear': {
      position: 'relative',
      verticalAlign: 'top',
      cursor: 'pointer',
      color: base01,
      fontSize: constants.iconFontSize,
      transform: 'rotate(45deg)'
    }
  };
}

export function getEditorStyle(
  theme: ThemeKeys | ThemeObject | boolean | undefined,
  component: string,
  extraStyle?: React.CSSProperties
): { style: React.CSSProperties } {
  const themeObj = resolveEditorTheme(theme);
  const stylesMap = getEditorStylesMap(themeObj);
  const defaultStyle = stylesMap[component] || {};

  let overrideStyle: React.CSSProperties = {};
  if (theme && typeof theme === 'object' && !Array.isArray(theme)) {
    const custom = (theme as Record<string, any>)[component];
    if (typeof custom === 'function') {
      overrideStyle = custom(component)?.style ?? {};
    } else if (custom && typeof custom === 'object') {
      overrideStyle = custom;
    }
  }

  return {
    style: {
      ...defaultStyle,
      ...overrideStyle,
      ...(extraStyle || {})
    }
  };
}

export default getEditorStyle;
