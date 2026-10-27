import type { Meta, StoryObj } from '@storybook/react';
import ReactJson, { type ThemeObject } from 'react-json-view-next';

const sampleObject = {
  themeGroup: 'Custom & Invented Themes',
  version: 19,
  features: ['native hooks', 'zero dependencies', 'strict TypeScript'],
  config: {
    dark: true,
    accent: '#00f5a0'
  }
};

const customCyberpunkTheme: ThemeObject = {
  scheme: 'cyberpunk',
  author: 'react-json-view-next',
  base00: '#000b1e',
  base01: '#051937',
  base02: '#0b2e59',
  base03: '#1a4980',
  base04: '#3273a8',
  base05: '#00e5ff',
  base06: '#76ffff',
  base07: '#ffffff',
  base08: '#ff0055',
  base09: '#ff7700',
  base0A: '#ffe600',
  base0B: '#00ff66',
  base0C: '#00ffff',
  base0D: '#0088ff',
  base0E: '#cc00ff',
  base0F: '#ff00aa'
};

const meta: Meta<typeof ReactJson> = {
  title: 'Themes/CustomThemes',
  component: ReactJson
};

export default meta;
type Story = StoryObj<typeof ReactJson>;

export const Aurora: Story = {
  args: { src: sampleObject, name: 'aurora', theme: 'aurora' }
};

export const Matcha: Story = {
  args: { src: sampleObject, name: 'matcha', theme: 'matcha' }
};

export const Nebula: Story = {
  args: { src: sampleObject, name: 'nebula', theme: 'nebula' }
};

export const Obsidian: Story = {
  args: { src: sampleObject, name: 'obsidian', theme: 'obsidian' }
};

export const Sakura: Story = {
  args: { src: sampleObject, name: 'sakura', theme: 'sakura' }
};

export const CustomThemeObject: Story = {
  args: {
    src: sampleObject,
    name: 'cyberpunk-custom',
    theme: customCyberpunkTheme
  }
};
