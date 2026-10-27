import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', 'storybook-version'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(config) {
    const rjvEntry = path.resolve(process.cwd(), '../react-json-view-next/src/index.ts');
    const clipboardEntry = path.resolve(
      process.cwd(),
      '../react-json-view-next/src/plugins/clipboard/index.ts'
    );
    const editorEntry = path.resolve(
      process.cwd(),
      '../react-json-view-next/src/plugins/editor/index.ts'
    );
    const searchEntry = path.resolve(
      process.cwd(),
      '../react-json-view-next/src/plugins/search/index.ts'
    );
    const virtualEntry = path.resolve(
      process.cwd(),
      '../react-json-view-next/src/plugins/virtual/index.ts'
    );
    const themesEntry = path.resolve(process.cwd(), '../react-json-view-next/src/themes/index.ts');
    const compatEntry = path.resolve(process.cwd(), '../react-json-view-next/src/compat/index.tsx');
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-json-view-next/plugins/virtual': virtualEntry,
      'react-json-view-next/plugins/search': searchEntry,
      'react-json-view-next/compat': compatEntry,
      'react-json-view-next/themes': themesEntry,
      'react-json-view-next/plugins/editor': editorEntry,
      'react-json-view-next/plugins/clipboard': clipboardEntry,
      'react-json-view-next': rjvEntry,
      'react-json-view/plugins/virtual': virtualEntry,
      'react-json-view/plugins/search': searchEntry,
      'react-json-view/compat': compatEntry,
      'react-json-view/themes': themesEntry,
      'react-json-view/plugins/editor': editorEntry,
      'react-json-view/plugins/clipboard': clipboardEntry,
      'react-json-view': rjvEntry
    };
    return config;
  }
};

export default config;
