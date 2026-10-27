import type { ThemeObject } from '../types';
import { rjv_default, rjv_grey } from './base16/rjv-themes';
import { base16Themes, customThemes, originalBase16Themes, popularThemes } from './base16/themes';
import {
  clearRegisteredThemes,
  getRegisteredTheme,
  registerTheme,
  registerThemes,
  useThemeRegistry
} from './themeRegistry';

export {
  base16Themes,
  clearRegisteredThemes,
  customThemes,
  getRegisteredTheme,
  originalBase16Themes,
  popularThemes,
  registerTheme,
  registerThemes,
  rjv_default,
  rjv_grey,
  useThemeRegistry
};

export function registerAllThemes(): void {
  registerThemes(base16Themes);
}

// Popular themes
export const dracula = popularThemes.dracula as ThemeObject;
export const nord = popularThemes.nord as ThemeObject;
export const gruvbox = popularThemes.gruvbox as ThemeObject;
export const onedark = popularThemes.onedark as ThemeObject;
export const catppuccin = popularThemes.catppuccin as ThemeObject;
export const tokyonight = popularThemes.tokyonight as ThemeObject;
export const rosepine = popularThemes.rosepine as ThemeObject;
export const everforest = popularThemes.everforest as ThemeObject;
export const synthwave = popularThemes.synthwave as ThemeObject;
export const nightowl = popularThemes.nightowl as ThemeObject;

// Custom themes
export const aurora = customThemes.aurora as ThemeObject;
export const matcha = customThemes.matcha as ThemeObject;
export const nebula = customThemes.nebula as ThemeObject;
export const obsidian = customThemes.obsidian as ThemeObject;
export const sakura = customThemes.sakura as ThemeObject;

// Original Base16 themes
export const apathy = originalBase16Themes.apathy as ThemeObject;
export const ashes = originalBase16Themes.ashes as ThemeObject;
export const bespin = originalBase16Themes.bespin as ThemeObject;
export const brewer = originalBase16Themes.brewer as ThemeObject;
export const bright = originalBase16Themes.bright as ThemeObject;
export const chalk = originalBase16Themes.chalk as ThemeObject;
export const codeschool = originalBase16Themes.codeschool as ThemeObject;
export const colors = originalBase16Themes.colors as ThemeObject;
export const eighties = originalBase16Themes.eighties as ThemeObject;
export const embers = originalBase16Themes.embers as ThemeObject;
export const flat = originalBase16Themes.flat as ThemeObject;
export const google = originalBase16Themes.google as ThemeObject;
export const grayscale = originalBase16Themes.grayscale as ThemeObject;
export const greenscreen = originalBase16Themes.greenscreen as ThemeObject;
export const harmonic = originalBase16Themes.harmonic as ThemeObject;
export const hopscotch = originalBase16Themes.hopscotch as ThemeObject;
export const isotope = originalBase16Themes.isotope as ThemeObject;
export const marrakesh = originalBase16Themes.marrakesh as ThemeObject;
export const mocha = originalBase16Themes.mocha as ThemeObject;
export const monokai = originalBase16Themes.monokai as ThemeObject;
export const ocean = originalBase16Themes.ocean as ThemeObject;
export const paraiso = originalBase16Themes.paraiso as ThemeObject;
export const pop = originalBase16Themes.pop as ThemeObject;
export const railscasts = originalBase16Themes.railscasts as ThemeObject;
export const shapeshifter = originalBase16Themes.shapeshifter as ThemeObject;
export const solarized = originalBase16Themes.solarized as ThemeObject;
export const summerfruit = originalBase16Themes.summerfruit as ThemeObject;
export const threezerotwofour = originalBase16Themes.threezerotwofour as ThemeObject;
export const tomorrow = originalBase16Themes.tomorrow as ThemeObject;
export const tube = originalBase16Themes.tube as ThemeObject;
export const twilight = originalBase16Themes.twilight as ThemeObject;

// Inverted themes
export const apathyInverted = originalBase16Themes['apathy:inverted'] as ThemeObject;
export const brightInverted = originalBase16Themes['bright:inverted'] as ThemeObject;
export const grayscaleInverted = originalBase16Themes['grayscale:inverted'] as ThemeObject;
export const shapeshifterInverted = originalBase16Themes['shapeshifter:inverted'] as ThemeObject;
export const summerfruitInverted = originalBase16Themes['summerfruit:inverted'] as ThemeObject;

export default base16Themes;
