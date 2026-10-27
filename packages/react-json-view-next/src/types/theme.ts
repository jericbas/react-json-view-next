export type IconStyle = 'circle' | 'triangle' | 'square';

export interface ThemeObject {
  scheme?: string;
  author?: string;
  base00: string;
  base01: string;
  base02: string;
  base03: string;
  base04: string;
  base05: string;
  base06: string;
  base07: string;
  base08: string;
  base09: string;
  base0A: string;
  base0B: string;
  base0C: string;
  base0D: string;
  base0E: string;
  base0F: string;
  [key: string]: any;
}

/** Original built-in Base16 themes */
export type Base16ThemeKeys =
  | 'apathy'
  | 'apathy:inverted'
  | 'ashes'
  | 'bespin'
  | 'brewer'
  | 'bright:inverted'
  | 'bright'
  | 'chalk'
  | 'codeschool'
  | 'colors'
  | 'eighties'
  | 'embers'
  | 'flat'
  | 'google'
  | 'grayscale'
  | 'grayscale:inverted'
  | 'greenscreen'
  | 'harmonic'
  | 'hopscotch'
  | 'isotope'
  | 'marrakesh'
  | 'mocha'
  | 'monokai'
  | 'ocean'
  | 'paraiso'
  | 'pop'
  | 'railscasts'
  | 'rjv-default'
  | 'rjv-grey'
  | 'shapeshifter'
  | 'shapeshifter:inverted'
  | 'solarized'
  | 'summerfruit'
  | 'summerfruit:inverted'
  | 'threezerotwofour'
  | 'tomorrow'
  | 'tube'
  | 'twilight'
  | 'none';

/** Popular community themes */
export type PopularThemeKeys =
  | 'catppuccin'
  | 'dracula'
  | 'everforest'
  | 'gruvbox'
  | 'nightowl'
  | 'nord'
  | 'onedark'
  | 'rosepine'
  | 'synthwave'
  | 'tokyonight';

/** Custom / invented themes */
export type CustomThemeKeys = 'aurora' | 'matcha' | 'nebula' | 'obsidian' | 'sakura';

export type ThemeKeys = Base16ThemeKeys | PopularThemeKeys | CustomThemeKeys;
