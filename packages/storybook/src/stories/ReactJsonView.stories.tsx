import type { Meta, StoryObj } from '@storybook/react';
import ReactJson from 'react-json-view-next';

const sampleData = {
  string: 'this is a test string',
  integer: 42,
  float: 114.514,
  boolean: true,
  null: null,
  nan: NaN,
  undefined: undefined,
  date: new Date('2026-10-23T12:00:00Z'),
  array: [1, 2, 'three', true, null],
  nested: {
    first: 'first nested item',
    second: 2,
    third: {
      inner: 'deeply nested value'
    }
  }
};

const meta: Meta<typeof ReactJson> = {
  title: 'Components/ReactJsonView',
  component: ReactJson,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '> 🚧 **Under Construction**: This library is actively undergoing modernization for React 19 and TypeScript. Live Storybook Demo & Documentation: [https://jericbas.github.io/react-json-view-next/](https://jericbas.github.io/react-json-view-next/)'
      }
    }
  },
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'rjv-default',
        'monokai',
        'ocean',
        'solarized',
        'tomorrow',
        'eighties',
        'dracula',
        'nord',
        'gruvbox',
        'onedark',
        'catppuccin',
        'tokyonight',
        'rosepine',
        'everforest',
        'synthwave',
        'nightowl',
        'aurora',
        'matcha',
        'nebula',
        'obsidian',
        'sakura',
        'rjv-grey'
      ]
    },
    iconStyle: {
      control: 'radio',
      options: ['triangle', 'circle', 'square']
    },
    collapsed: {
      control: 'boolean'
    },
    indentWidth: {
      control: { type: 'range', min: 1, max: 8, step: 1 }
    },
    collapseStringsAfterLength: {
      control: { type: 'number', min: 0, max: 100 }
    },
    displayDataTypes: {
      control: 'boolean'
    },
    displayObjectSize: {
      control: 'boolean'
    },
    enableClipboard: {
      control: 'boolean'
    },
    displayArrayKey: {
      control: 'boolean'
    },
    quotesOnKeys: {
      control: 'boolean'
    },
    sortKeys: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ReactJson>;

export const Default: Story = {
  args: {
    src: sampleData,
    name: 'root',
    theme: 'rjv-default',
    iconStyle: 'triangle',
    collapsed: false,
    indentWidth: 4,
    displayDataTypes: true,
    displayObjectSize: true,
    enableClipboard: true,
    quotesOnKeys: true
  }
};

export const Editable: Story = {
  args: {
    src: {
      user: 'Alice',
      role: 'Admin',
      active: true,
      age: 28,
      tags: ['engineer', 'maintainer']
    },
    name: 'editable-example',
    theme: 'monokai',
    onEdit: edit => {
      console.log('Edit submitted:', edit);
    },
    onAdd: add => {
      console.log('Add submitted:', add);
    },
    onDelete: del => {
      console.log('Delete submitted:', del);
    }
  }
};

export const CollapsedByDefault: Story = {
  args: {
    src: sampleData,
    name: 'collapsed-tree',
    collapsed: true,
    theme: 'ocean'
  }
};
