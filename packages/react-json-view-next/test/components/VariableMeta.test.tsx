import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import VariableMeta from '../../src/components/VariableMeta';

describe('<VariableMeta />', () => {
  it('VariableMeta clipboard should not exist when disabled', () => {
    const { container } = render(
      <VariableMeta
        src={{ test: true }}
        size={1}
        theme="rjv-default"
        enableClipboard={false}
        namespace={['root']}
      />
    );
    expect(container.querySelectorAll('.copy-to-clipboard-container')).toHaveLength(0);
  });

  it('VariableMeta size should exist when displayObjectSize is true', () => {
    const { container } = render(
      <VariableMeta
        src={{ test: true }}
        size={1}
        theme="rjv-default"
        displayObjectSize={true}
        namespace={['root']}
      />
    );
    expect(container.querySelectorAll('.object-size')).toHaveLength(1);
  });

  it('VariableMeta size should not exist when displayObjectSize is false', () => {
    const { container } = render(
      <VariableMeta
        src={{ test: true }}
        size={1}
        theme="rjv-default"
        displayObjectSize={false}
        namespace={['root']}
      />
    );
    expect(container.querySelectorAll('.object-size')).toHaveLength(0);
  });

  it('VariableMeta clipboard click with copy callback', () => {
    const inputSrc = { test: true };
    const copyCallback = vi.fn();
    const { container } = render(
      <VariableMeta
        src={inputSrc}
        size={1}
        theme="rjv-default"
        namespace={['test']}
        enableClipboard={copyCallback}
        rowHovered={true}
      />
    );

    expect(container.querySelectorAll('.copy-to-clipboard-container')).toHaveLength(1);
    expect(container.querySelectorAll('.copy-icon')).toHaveLength(1);

    const copyIcon = container.querySelector('.copy-icon');
    expect(copyIcon).not.toBeNull();
    if (copyIcon) {
      fireEvent.click(copyIcon);
    }
    expect(copyCallback).toHaveBeenCalledWith({
      src: inputSrc,
      namespace: ['test'],
      name: 'test'
    });
  });

  it('VariableMeta clipboard click without copy callback', () => {
    const { container } = render(
      <VariableMeta
        src={{ test: true }}
        size={1}
        theme="rjv-default"
        enableClipboard={true}
        rowHovered={true}
        namespace={['root']}
      />
    );
    expect(container.querySelectorAll('.copy-to-clipboard-container')).toHaveLength(1);
    expect(container.querySelectorAll('.copy-icon')).toHaveLength(1);
  });
});
