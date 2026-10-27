import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ObjectName from '../../src/components/ObjectName';

describe('<ObjectName />', () => {
  it('ObjectName mount', () => {
    const { container } = render(
      <ObjectName namespace={['test']} name="test" theme="rjv-default" jsvRoot={false} />
    );
    expect(container.querySelectorAll('.object-key')).toHaveLength(1);
  });

  it('ObjectName with parent array mount', () => {
    const { container } = render(
      <ObjectName
        namespace={['test']}
        name="test"
        parent_type="array"
        theme="rjv-default"
        jsvRoot={false}
        displayArrayKey={true}
      />
    );
    expect(container.querySelectorAll('.array-key')).toHaveLength(1);
  });

  it('ObjectName at root without name', () => {
    const { container } = render(
      <ObjectName namespace={['test']} name={false} theme="rjv-default" jsvRoot={true} />
    );
    expect(container.querySelector('span')?.childNodes).toHaveLength(0);
  });

  it('ObjectName with quotesOnKeys enabled (default)', () => {
    const { container } = render(
      <ObjectName
        namespace={['test']}
        name="test"
        theme="rjv-default"
        jsvRoot={false}
        quotesOnKeys={true}
      />
    );
    const objectKey = container.querySelector('.object-key');
    expect(objectKey?.querySelectorAll('span')).toHaveLength(3);
  });

  it('ObjectName with quotesOnKeys disabled', () => {
    const { container } = render(
      <ObjectName
        namespace={['test']}
        name="test"
        theme="rjv-default"
        jsvRoot={false}
        quotesOnKeys={false}
      />
    );
    const objectKey = container.querySelector('.object-key');
    expect(objectKey?.querySelectorAll('span')).toHaveLength(1);
  });

  it('ObjectName array hides key', () => {
    const { container } = render(
      <ObjectName
        namespace={['test']}
        name="test"
        parent_type="array"
        theme="rjv-default"
        jsvRoot={false}
        displayArrayKey={false}
      />
    );
    expect(container.querySelectorAll('.array-key')).toHaveLength(0);
  });
});
