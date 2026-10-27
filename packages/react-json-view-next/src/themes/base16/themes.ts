import type { ThemeObject } from '../../types';
import { themesCustom } from './themesCustom';
import { themesInverted } from './themesInverted';
import { themesPart1 } from './themesPart1';
import { themesPart2 } from './themesPart2';
import { themesPart3 } from './themesPart3';
import { themesPart4 } from './themesPart4';
import { themesPopular1 } from './themesPopular1';
import { themesPopular2 } from './themesPopular2';

export const originalBase16Themes: Record<string, ThemeObject> = {
  ...themesPart1,
  ...themesPart2,
  ...themesPart3,
  ...themesPart4,
  ...themesInverted
};

export const popularThemes: Record<string, ThemeObject> = {
  ...themesPopular1,
  ...themesPopular2
};

export const customThemes: Record<string, ThemeObject> = {
  ...themesCustom
};

export const base16Themes: Record<string, ThemeObject> = {
  ...originalBase16Themes,
  ...popularThemes,
  ...customThemes
};
