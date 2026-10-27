import type { ColorMap } from '../colorMap';
import constants from '../styleConstants';

export const getDataTypeStyles = (colors: ColorMap) => ({
  'data-type-label': {
    fontSize: constants.dataTypeFontSize,
    marginRight: constants.dataTypeMarginRight,
    opacity: constants.datatypeOpacity
  },
  boolean: {
    display: 'inline-block',
    color: colors.dataTypes.boolean
  },
  date: {
    display: 'inline-block',
    color: colors.dataTypes.date
  },
  'date-value': {
    marginLeft: constants.dateValueMarginLeft
  },
  float: {
    display: 'inline-block',
    color: colors.dataTypes.float
  },
  function: {
    display: 'inline-block',
    color: colors.dataTypes.function,
    cursor: 'pointer',
    whiteSpace: 'pre-line'
  },
  'function-value': {
    fontStyle: 'italic'
  },
  integer: {
    display: 'inline-block',
    color: colors.dataTypes.integer
  },
  string: {
    display: 'inline-block',
    color: colors.dataTypes.string
  },
  nan: {
    display: 'inline-block',
    color: colors.dataTypes.nan,
    fontSize: constants.nanFontSize,
    fontWeight: constants.nanFontWeight,
    backgroundColor: colors.dataTypes.background,
    padding: constants.nanPadding,
    borderRadius: constants.nanBorderRadius
  },
  null: {
    display: 'inline-block',
    color: colors.dataTypes.null,
    fontSize: constants.nullFontSize,
    fontWeight: constants.nullFontWeight,
    backgroundColor: colors.dataTypes.background,
    padding: constants.nullPadding,
    borderRadius: constants.nullBorderRadius
  },
  undefined: {
    display: 'inline-block',
    color: colors.dataTypes.undefined,
    fontSize: constants.undefinedFontSize,
    padding: constants.undefinedPadding,
    borderRadius: constants.undefinedBorderRadius,
    backgroundColor: colors.dataTypes.background
  },
  regexp: {
    display: 'inline-block',
    color: colors.dataTypes.regexp
  }
});
