import type { Preview } from '@storybook/react';
import { registerAllThemes } from 'react-json-view-next/themes';
import pkg from '../../react-json-view-next/package.json';

registerAllThemes();

const [major = '2', minor = '0', patch = '0'] = pkg.version.split('.');

const preview: Preview = {
  parameters: {
    version: {
      major,
      minor,
      patch
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Documentation',
          ['Props'],
          'Components',
          ['ReactJsonView', 'Themes', 'LargeData', 'AsyncSuspense']
        ]
      }
    }
  }
};

export default preview;
