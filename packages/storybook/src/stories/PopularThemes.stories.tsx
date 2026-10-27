import type { Meta, StoryObj } from '@storybook/react';
import ReactJson from 'react-json-view-next';

const sampleObject = {
  themeGroup: 'Popular Community Themes',
  version: 19,
  features: ['native hooks', 'zero dependencies', 'strict TypeScript'],
  config: {
    dark: true,
    accent: '#bd93f9'
  }
};

const meta: Meta<typeof ReactJson> = {
  title: 'Themes/PopularThemes',
  component: ReactJson
};

export default meta;
type Story = StoryObj<typeof ReactJson>;

export const Dracula: Story = {
  args: { src: sampleObject, name: 'dracula', theme: 'dracula' }
};

export const Nord: Story = {
  args: { src: sampleObject, name: 'nord', theme: 'nord' }
};

export const Gruvbox: Story = {
  args: { src: sampleObject, name: 'gruvbox', theme: 'gruvbox' }
};

export const OneDark: Story = {
  args: { src: sampleObject, name: 'onedark', theme: 'onedark' }
};

export const Catppuccin: Story = {
  args: { src: sampleObject, name: 'catppuccin', theme: 'catppuccin' }
};

export const TokyoNight: Story = {
  args: { src: sampleObject, name: 'tokyonight', theme: 'tokyonight' }
};

export const RosePine: Story = {
  args: { src: sampleObject, name: 'rosepine', theme: 'rosepine' }
};

export const Everforest: Story = {
  args: { src: sampleObject, name: 'everforest', theme: 'everforest' }
};

export const Synthwave: Story = {
  args: { src: sampleObject, name: 'synthwave', theme: 'synthwave' }
};

export const NightOwl: Story = {
  args: { src: sampleObject, name: 'nightowl', theme: 'nightowl' }
};
