import type { ThemeObject } from '../types';
import { colorMap } from './colorMap';
import { getDataTypeStyles } from './componentStyles/dataTypeStyles';
import constants from './styleConstants';

export const getDefaultThemeStyling = (theme: ThemeObject) => {
  const colors = colorMap(theme);

  return {
    'app-container': {
      fontFamily: constants.globalFontFamily,
      cursor: constants.globalCursor,
      backgroundColor: colors.backgroundColor,
      position: 'relative'
    },
    ellipsis: {
      display: 'inline-block',
      color: colors.ellipsisColor,
      fontSize: constants.ellipsisFontSize,
      lineHeight: constants.ellipsisLineHeight,
      cursor: constants.ellipsisCursor
    },
    'brace-row': {
      display: 'inline-block',
      cursor: 'pointer'
    },
    brace: {
      display: 'inline-block',
      cursor: constants.braceCursor,
      fontWeight: constants.braceFontWeight,
      color: colors.braceColor
    },
    'expanded-icon': {
      color: colors.expandedIcon
    },
    'collapsed-icon': {
      color: colors.collapsedIcon
    },
    colon: {
      display: 'inline-block',
      margin: constants.keyMargin,
      color: colors.keyColor,
      verticalAlign: 'top'
    },
    objectKeyVal: (_component: any, variable_style: any) => ({
      style: {
        paddingTop: constants.keyValPaddingTop,
        paddingRight: constants.keyValPaddingRight,
        paddingBottom: constants.keyValPaddingBottom,
        borderLeft: `${constants.keyValBorderLeft} ${colors.objectBorder}`,
        ':hover': {
          paddingLeft:
            variable_style?.paddingLeft !== undefined
              ? `${variable_style.paddingLeft - 1}px`
              : undefined,
          borderLeft: `${constants.keyValBorderHover} ${colors.objectBorder}`
        },
        ...variable_style
      }
    }),
    'object-key-val-no-border': {
      padding: constants.keyValPaddingTop
    },
    'pushed-content': {
      marginLeft: constants.pushedContentMarginLeft
    },
    variableValue: (_component: any, variable_style: any) => ({
      style: {
        display: 'inline-block',
        paddingRight: constants.variableValuePaddingRight,
        position: 'relative',
        ...variable_style
      }
    }),
    'object-name': {
      display: 'inline-block',
      color: colors.keyColor,
      letterSpacing: constants.keyLetterSpacing,
      fontStyle: constants.keyFontStyle,
      verticalAlign: constants.keyVerticalAlign,
      opacity: constants.keyOpacity,
      ':hover': {
        opacity: constants.keyOpacityHover
      }
    },
    'array-key': {
      display: 'inline-block',
      color: colors.arrayKeyColor,
      letterSpacing: constants.keyLetterSpacing,
      fontStyle: constants.keyFontStyle,
      verticalAlign: constants.keyVerticalAlign,
      opacity: constants.keyOpacity,
      ':hover': {
        opacity: constants.keyOpacityHover
      }
    },
    'object-size': {
      color: colors.objectSize,
      borderRadius: constants.objectSizeBorderRadius,
      fontStyle: constants.objectSizeFontStyle,
      margin: constants.objectSizeMargin,
      cursor: 'default'
    },
    'copy-to-clipboard': {
      cursor: constants.clipboardCursor
    },
    'copy-icon': {
      color: colors.copyToClipboard,
      fontSize: constants.iconFontSize,
      marginRight: constants.iconMarginRight,
      verticalAlign: 'top'
    },
    'copy-icon-copied': {
      color: colors.copyToClipboardCheck,
      marginLeft: constants.clipboardCheckMarginLeft
    },
    'array-group-meta-data': {
      display: 'inline-block',
      padding: constants.arrayGroupMetaPadding
    },
    'object-meta-data': {
      display: 'inline-block',
      padding: constants.metaDataPadding
    },
    'icon-container': {
      display: 'inline-block',
      width: constants.iconContainerWidth
    },
    tooltip: {
      padding: constants.tooltipPadding
    },
    ...getDataTypeStyles(colors)
  };
};
