import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CopyToClipboard from '../../src/components/CopyToClipboard';

describe('<CopyToClipboard />', () => {
  it('CopyToClipboard container should exist', () => {
    const { container } = render(
      <CopyToClipboard
        src={{ test: true }}
        theme="rjv-default"
        clickCallback={true}
        hidden={false}
        namespace={['root']}
      />
    );
    expect(container.querySelectorAll('.copy-to-clipboard-container')).toHaveLength(1);
  });

  it('CopyToClipboard container exists when hidden', () => {
    const { container } = render(
      <CopyToClipboard
        src={{ test: true }}
        theme="rjv-default"
        clickCallback={true}
        hidden={true}
        namespace={['root']}
      />
    );
    expect(container.querySelectorAll('.copy-to-clipboard-container')).toHaveLength(1);
  });

  it('copies to clipboard on click using navigator.clipboard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    const callbackMock = vi.fn();
    const { container } = render(
      <CopyToClipboard
        src={{ test: true }}
        theme="rjv-default"
        clickCallback={callbackMock}
        hidden={false}
        namespace={['root', 'sub']}
        rowHovered={true}
      />
    );

    const clickTarget = container.querySelector('.copy-to-clipboard-container > span');
    expect(clickTarget).not.toBeNull();
    fireEvent.click(clickTarget!);
    await Promise.resolve();

    expect(writeTextMock).toHaveBeenCalledWith('{\n  "test": true\n}');
    expect(callbackMock).toHaveBeenCalledWith({
      src: { test: true },
      namespace: ['root', 'sub'],
      name: 'sub'
    });
  });
});
