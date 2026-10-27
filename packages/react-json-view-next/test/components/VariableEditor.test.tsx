import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VariableEditor } from '../../src/components/VariableEditor';
import { defaultContextValue, JsonViewContext } from '../../src/context/JsonViewContext';

describe('<VariableEditor />', () => {
  it('VariableEditor click-to-edit should be rendered when onEdit enabled and hovered', () => {
    const { container } = render(
      <VariableEditor
        theme="rjv-default"
        onEdit={() => {}}
        singleIndent={1}
        namespace={['root']}
        variable={{
          name: 'test',
          value: 5,
          type: 'integer'
        }}
      />
    );
    const row = container.querySelector('.variable-row');
    expect(row).not.toBeNull();
    if (row) {
      fireEvent.mouseEnter(row);
    }
    expect(container.querySelectorAll('.click-to-edit')).toHaveLength(1);
  });

  it('VariableEditor click-to-edit should be hidden when onEdit disabled', () => {
    const { container } = render(
      <VariableEditor
        theme="rjv-default"
        onEdit={false}
        singleIndent={1}
        namespace={['root']}
        variable={{
          name: 'test',
          value: 5,
          type: 'integer'
        }}
      />
    );
    expect(container.querySelectorAll('.click-to-edit')).toHaveLength(0);
  });

  it('VariableEditor test textarea and cancel icon', () => {
    const { container } = render(
      <VariableEditor
        theme="rjv-default"
        onEdit={() => {}}
        singleIndent={1}
        namespace={['root']}
        variable={{
          name: 'test',
          value: 5,
          type: 'integer'
        }}
      />
    );

    const row = container.querySelector('.variable-row');
    if (row) {
      fireEvent.mouseEnter(row);
    }

    const editBtn = container.querySelector('.click-to-edit-icon');
    expect(editBtn).not.toBeNull();
    if (editBtn) {
      fireEvent.click(editBtn);
    }

    expect(container.querySelectorAll('.variable-editor')).toHaveLength(1);
    const cancelBtn = container.querySelector('.edit-cancel');
    expect(cancelBtn).not.toBeNull();
    if (cancelBtn) {
      fireEvent.click(cancelBtn);
    }
    expect(container.querySelectorAll('.variable-editor')).toHaveLength(0);
  });

  it('VariableEditor test textarea and submit icon', () => {
    const existingValue = 'existing_value';
    const newValue = 'new_value';
    const mockDispatch = vi.fn();

    const { container } = render(
      <JsonViewContext.Provider
        value={{
          ...defaultContextValue,
          src: { test: existingValue },
          dispatch: mockDispatch
        }}
      >
        <VariableEditor
          theme="rjv-default"
          onEdit={() => {}}
          singleIndent={1}
          namespace={['root']}
          variable={{
            name: 'test',
            value: existingValue,
            type: 'string'
          }}
        />
      </JsonViewContext.Provider>
    );

    const row = container.querySelector('.variable-row');
    if (row) {
      fireEvent.mouseEnter(row);
    }

    const editBtn = container.querySelector('.click-to-edit-icon');
    if (editBtn) {
      fireEvent.click(editBtn);
    }

    const textarea = container.querySelector('.variable-editor') as HTMLTextAreaElement;
    expect(textarea).not.toBeNull();
    expect(textarea.value).toBe(existingValue);

    fireEvent.change(textarea, { target: { value: newValue } });
    expect(textarea.value).toBe(newValue);

    const submitBtn = container.querySelector('.edit-check.string-value');
    expect(submitBtn).not.toBeNull();
    if (submitBtn) {
      fireEvent.click(submitBtn);
    }

    expect(container.querySelectorAll('.variable-editor')).toHaveLength(0);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'VARIABLE_UPDATED',
      payload: {
        name: 'test',
        namespace: ['root'],
        existing_value: existingValue,
        new_value: newValue,
        variable_removed: false
      }
    });
  });
});
