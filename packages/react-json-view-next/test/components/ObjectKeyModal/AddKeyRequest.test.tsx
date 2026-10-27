import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AddKeyRequest from '../../../src/components/ObjectKeyModal/AddKeyRequest';
import { defaultContextValue, JsonViewContext } from '../../../src/context/JsonViewContext';

describe('<AddKeyRequest />', () => {
  it('AddKeyRequest should not render input when inactive', () => {
    const { container } = render(<AddKeyRequest active={false} theme="rjv-default" />);
    expect(container.querySelectorAll('.key-modal-input')).toHaveLength(0);
  });

  it('AddKeyRequest should render input when active with context', () => {
    const mockDispatch = vi.fn();
    const { container } = render(
      <JsonViewContext.Provider
        value={{
          ...defaultContextValue,
          src: { test: true },
          addKeyRequest: {
            existing_value: { test: true },
            namespace: ['root'],
            name: 'new-key'
          },
          dispatch: mockDispatch
        }}
      >
        <AddKeyRequest active={true} theme="rjv-default" />
      </JsonViewContext.Provider>
    );

    expect(container.querySelectorAll('.key-modal-input')).toHaveLength(1);
  });
});
