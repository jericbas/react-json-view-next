import type { Meta, StoryObj } from '@storybook/react';
import { JsonViewer, type JsonViewPlugin } from 'react-json-view-next';

const sampleUserData = {
  id: 101,
  username: 'jericbas',
  profileUrl: 'https://github.com/jericbas',
  primaryColor: '#61afef',
  status: 'active',
  roles: ['maintainer', 'architect'],
  settings: {
    notifications: true,
    theme: 'dark'
  }
};

const meta: Meta<typeof JsonViewer> = {
  title: 'Architecture/PluginSlots',
  component: JsonViewer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Demonstrates the structured Plugin Slot Architecture of `<JsonViewer />`: row actions, value interception, root overlays, and tree rendering.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof JsonViewer>;

const urlLinkifierPlugin: JsonViewPlugin = {
  name: 'url-linkifier',
  renderValue: ({ variable, defaultRender }) => {
    if (
      typeof variable.value === 'string' &&
      (variable.value.startsWith('http://') || variable.value.startsWith('https://'))
    ) {
      return (
        <a
          href={variable.value}
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#98c379',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          {variable.value} ↗
        </a>
      );
    }
    return defaultRender();
  }
};

const rowActionsPlugin: JsonViewPlugin = {
  name: 'row-actions',
  renderRowActions: ({ variable, hovered }) => {
    if (!hovered) return null;
    return (
      <span style={{ marginLeft: 8, display: 'inline-flex', gap: 4 }}>
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            alert(`Selected key: ${variable.name}`);
          }}
          style={{
            fontSize: 10,
            padding: '1px 6px',
            borderRadius: 3,
            border: '1px solid #4b5263',
            background: '#282c34',
            color: '#abb2bf',
            cursor: 'pointer'
          }}
        >
          Inspect
        </button>
      </span>
    );
  }
};

const rootOverlayPlugin: JsonViewPlugin = {
  name: 'status-bar-overlay',
  renderRootOverlay: ({ src }) => (
    <div
      style={{
        padding: '6px 12px',
        marginBottom: 8,
        borderRadius: 4,
        background: 'rgba(97, 175, 239, 0.1)',
        border: '1px solid rgba(97, 175, 239, 0.3)',
        color: '#61afef',
        fontSize: 12,
        fontWeight: 600
      }}
    >
      🔌 Plugin System Active • Total Keys: {Object.keys(src || {}).length}
    </div>
  )
};

export const ValueInterception: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [urlLinkifierPlugin]
  }
};

export const RowActions: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [rowActionsPlugin]
  }
};

export const CombinedPlugins: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [rootOverlayPlugin, urlLinkifierPlugin, rowActionsPlugin]
  }
};
