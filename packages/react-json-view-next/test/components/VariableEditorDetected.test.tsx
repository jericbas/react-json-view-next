import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VariableEditor } from '../../src/components/VariableEditor';

describe('<VariableEditor /> detected inputs', () => {
  it('VariableEditor detected null', () => {
    const { container } = render(
      <VariableEditor
        theme="rjv-default"
        onEdit={() => {}}
        singleIndent={1}
        namespace={['root']}
        variable={{
          name: 'test',
          value: null,
          type: 'null'
        }}
      />
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
    expect(textarea.value).toBe('null');
  });

  it('VariableEditor detected NaN', () => {
    const { container } = render(
      <VariableEditor
        theme="rjv-default"
        onEdit={() => {}}
        singleIndent={1}
        namespace={['root']}
        variable={{
          name: 'test',
          value: NaN,
          type: 'nan'
        }}
      />
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
    expect(textarea.value).toBe('NaN');
  });

  it('VariableEditor detected undefined', () => {
    const { container } = render(
      <VariableEditor
        theme="rjv-default"
        onEdit={() => {}}
        singleIndent={1}
        namespace={['root']}
        variable={{
          name: 'test',
          value: undefined,
          type: 'undefined'
        }}
      />
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
    expect(textarea.value).toBe('undefined');
  });
});
