// biome-ignore lint/style/useImportType: React runtime value is required by Storybook manager bundler
import React from 'react';
import { addons, types, useParameter } from 'storybook/manager-api';
import pkg from '../../react-json-view-next/package.json';

interface VersionParam {
  major: string;
  minor: string;
  patch: string;
  postfix?: string;
  style?: Record<string, string>;
}

const VersionTag: React.FC = () => {
  const versionParam = useParameter<VersionParam | null>('version', null);
  const versionText = versionParam
    ? `v${versionParam.major}.${versionParam.minor}.${versionParam.patch}${
        versionParam.postfix ? `-${versionParam.postfix}` : ''
      }`
    : `v${pkg.version}`;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        alignSelf: 'center',
        padding: '2px 8px',
        margin: '0 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 700,
        lineHeight: '16px',
        backgroundColor: 'rgba(97, 175, 239, 0.15)',
        color: '#61afef',
        border: '1px solid rgba(97, 175, 239, 0.3)',
        letterSpacing: '0.5px',
        userSelect: 'none'
      }}
      title={`react-json-view-next version: ${versionText}`}
    >
      {versionText}
    </div>
  );
};

addons.register('storybook-version', () => {
  addons.add('storybook-version/toolbar', {
    type: types.TOOL,
    title: 'Version',
    match: ({ viewMode }) => Boolean(viewMode?.match(/^(story|docs)$/)),
    render: () => <VersionTag />
  });
});
