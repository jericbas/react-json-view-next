import type { Meta, StoryObj } from '@storybook/react';
import ReactJson from 'react-json-view-next';
import { withSearch } from 'react-json-view-next/plugins/search';

const samplePayload = {
  appName: 'Antigravity CLI',
  version: '2.0.0',
  features: [
    { id: 1, name: 'Search Plugin', enabled: true, category: 'plugins' },
    { id: 2, name: 'Virtualization', enabled: true, category: 'performance' },
    { id: 3, name: 'Base16 Theming', enabled: true, category: 'theming' }
  ],
  configuration: {
    logLevel: 'debug',
    timeoutMs: 5000,
    endpoints: {
      primary: 'https://api.example.com/v1',
      fallback: 'https://backup.example.com/v1'
    }
  }
};

const meta: Meta<typeof ReactJson> = {
  title: 'Plugins/SearchPlugin',
  component: ReactJson
};

export default meta;
type Story = StoryObj<typeof ReactJson>;

export const DefaultSearch: Story = {
  render: () => (
    <ReactJson
      src={samplePayload}
      name="systemConfig"
      plugins={[withSearch({ placeholder: 'Search keys, values, or try $.features[*].name...' })]}
    />
  )
};

export const PreFilteredQuery: Story = {
  render: () => (
    <ReactJson
      src={samplePayload}
      name="systemConfig"
      plugins={[withSearch({ query: 'plugin', highlightColor: '#a7f3d0' })]}
    />
  )
};
