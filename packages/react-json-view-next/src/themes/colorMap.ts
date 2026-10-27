import type { ThemeObject } from '../types';

export const colorMap = (theme: ThemeObject) => ({
  backgroundColor: theme.base00,
  ellipsisColor: theme.base09,
  braceColor: theme.base07,
  expandedIcon: theme.base0D,
  collapsedIcon: theme.base0E,
  keyColor: theme.base07,
  arrayKeyColor: theme.base0C,
  objectSize: theme.base04,
  copyToClipboard: theme.base0F,
  copyToClipboardCheck: theme.base0D,
  objectBorder: theme.base02,
  dataTypes: {
    boolean: theme.base0E,
    date: theme.base0D,
    float: theme.base0B,
    function: theme.base0D,
    integer: theme.base0F,
    string: theme.base09,
    nan: theme.base08,
    null: theme.base0A,
    undefined: theme.base05,
    regexp: theme.base0A,
    background: theme.base02
  },
  editVariable: {
    editIcon: theme.base0E,
    cancelIcon: theme.base09,
    removeIcon: theme.base09,
    addIcon: theme.base0E,
    checkIcon: theme.base0E,
    background: theme.base01,
    color: theme.base0A,
    border: theme.base07
  },
  addKeyModal: {
    background: theme.base05,
    border: theme.base04,
    color: theme.base0A,
    labelColor: theme.base01
  },
  validationFailure: {
    background: theme.base09,
    iconColor: theme.base01,
    fontColor: theme.base01
  }
});

export type ColorMap = ReturnType<typeof colorMap>;
