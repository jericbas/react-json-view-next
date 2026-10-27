import type { Meta, StoryObj } from '@storybook/react';
import ReactJson from 'react-json-view-next';

const sampleObject = {
  themeGroup: 'Base16 Original Themes',
  version: 19,
  features: ['native hooks', 'zero dependencies', 'strict TypeScript'],
  config: {
    dark: true,
    accent: '#01a1dd'
  }
};

const meta: Meta<typeof ReactJson> = {
  title: 'Themes/Base16Themes',
  component: ReactJson
};

export default meta;
type Story = StoryObj<typeof ReactJson>;

export const RjvDefault: Story = {
  args: { src: sampleObject, name: 'rjv-default', theme: 'rjv-default' }
};

export const Monokai: Story = {
  args: { src: sampleObject, name: 'monokai', theme: 'monokai' }
};

export const Solarized: Story = {
  args: { src: sampleObject, name: 'solarized', theme: 'solarized' }
};

export const Ocean: Story = {
  args: { src: sampleObject, name: 'ocean', theme: 'ocean' }
};

export const Tomorrow: Story = {
  args: { src: sampleObject, name: 'tomorrow', theme: 'tomorrow' }
};

export const Eighties: Story = {
  args: { src: sampleObject, name: 'eighties', theme: 'eighties' }
};

export const Hopscotch: Story = {
  args: { src: sampleObject, name: 'hopscotch', theme: 'hopscotch' }
};

export const Paraiso: Story = {
  args: { src: sampleObject, name: 'paraiso', theme: 'paraiso' }
};

export const Twilight: Story = {
  args: { src: sampleObject, name: 'twilight', theme: 'twilight' }
};

export const Railscasts: Story = {
  args: { src: sampleObject, name: 'railscasts', theme: 'railscasts' }
};

export const Mocha: Story = {
  args: { src: sampleObject, name: 'mocha', theme: 'mocha' }
};

export const Flat: Story = {
  args: { src: sampleObject, name: 'flat', theme: 'flat' }
};

export const Google: Story = {
  args: { src: sampleObject, name: 'google', theme: 'google' }
};

export const RjvGrey: Story = {
  args: { src: sampleObject, name: 'rjv-grey', theme: 'rjv-grey' }
};
