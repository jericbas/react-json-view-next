import type { Meta, StoryObj } from '@storybook/react';
import ReactJson from 'react-json-view-next';

const largeArray = Array.from({ length: 250 }, (_, i) => ({
  id: i + 1,
  title: `Item #${i + 1}`,
  value: Math.floor(Math.random() * 1000),
  active: i % 2 === 0
}));

const meta: Meta<typeof ReactJson> = {
  title: 'Advanced/LargeData',
  component: ReactJson
};

export default meta;
type Story = StoryObj<typeof ReactJson>;

export const GroupedBy100: Story = {
  args: {
    src: largeArray,
    name: 'large-dataset-grouped-100',
    groupArraysAfterLength: 100,
    theme: 'rjv-default'
  }
};

export const GroupedBy50: Story = {
  args: {
    src: largeArray,
    name: 'large-dataset-grouped-50',
    groupArraysAfterLength: 50,
    theme: 'ocean'
  }
};
