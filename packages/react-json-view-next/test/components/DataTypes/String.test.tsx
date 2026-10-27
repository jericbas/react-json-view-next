import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonString from '../../../src/components/DataTypes/String';

describe('<JsonString />', () => {
  it('string component should have a data type label', () => {
    const { container } = render(
      <JsonString value="test" namespace={['root']} displayDataTypes={true} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);
  });

  it('string with hidden data type', () => {
    const { container } = render(
      <JsonString value="test" namespace={['root']} displayDataTypes={false} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });

  it('collapsed string content', () => {
    const { container } = render(
      <JsonString
        value="123456789"
        namespace={['root']}
        collapseStringsAfterLength={3}
        theme="rjv-default"
      />
    );
    expect(container.querySelector('.string-value')?.textContent).toContain('123');
    expect(container.querySelector('.string-value')?.textContent).toContain('...');
  });
});
