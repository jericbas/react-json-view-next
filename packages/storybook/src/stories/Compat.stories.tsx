import type { Meta, StoryObj } from '@storybook/react';
import ReactJsonCompat from 'react-json-view-next/compat';

const sampleData = {
  string: 'this is a test string',
  integer: 42,
  float: 114.514,
  boolean: true,
  array: [1, 2, 'three'],
  object: {
    nestedKey: 'nestedValue'
  }
};

const meta: Meta<typeof ReactJsonCompat> = {
  title: 'Compat/ReactJsonCompat',
  component: ReactJsonCompat
};

export default meta;
type Story = StoryObj<typeof ReactJsonCompat>;

export const DefaultCompat: Story = {
  args: {
    src: sampleData,
    name: 'root',
    enableClipboard: true
  }
};

export const KeyAndValuesOnly: Story = {
  name: 'Key & Values Only (No Data Types)',
  args: {
    src: sampleData,
    name: 'root',
    displayDataTypes: false,
    displayObjectSize: false,
    enableClipboard: true
  }
};
