import type { Meta, StoryObj } from '@storybook/react';
import { JsonViewer } from 'react-json-view-next';
import { withClipboard } from 'react-json-view-next/plugins/clipboard';

const sampleUserData = {
  id: 101,
  username: 'jericbas',
  profileUrl: 'https://github.com/jericbas',
  roles: ['maintainer', 'architect'],
  settings: {
    notifications: true,
    theme: 'dark'
  }
};

const meta: Meta<typeof JsonViewer> = {
  title: 'Plugins/Clipboard',
  component: JsonViewer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Demonstrates the independent, tree-shakeable Clipboard Plugin (`react-json-view-next/plugins/clipboard`). Supports copying JSON values, key paths, custom formatting, and copy callbacks.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof JsonViewer>;

export const DefaultValueCopy: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [withClipboard()]
  }
};

export const CopyPath: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [withClipboard({ copyPath: true })]
  }
};

export const CustomFormat: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [
      withClipboard({
        format: ctx => `https://api.github.com/v1/${ctx.path}`
      })
    ]
  }
};

export const CopyCallback: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [
      withClipboard({
        callback: copy => {
          console.log('Clipboard action triggered:', copy);
        }
      })
    ]
  }
};
