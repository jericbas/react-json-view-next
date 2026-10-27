import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import JsonViewer from '../../src/components/JsonViewer';
import { withDelete, withEdit, withEditor } from '../../src/plugins/editor';

describe('withEditor Plugin Suite', () => {
  it('renders edit and delete icons on primitive rows when hovered', () => {
    const { container } = render(
      <JsonViewer
        src={{ count: 42 }}
        plugins={[withEditor({ onEdit: () => {}, onDelete: () => {} })]}
      />
    );
    const row = container.querySelector('.variable-row');
    expect(row).not.toBeNull();
    if (row) fireEvent.mouseEnter(row);

    expect(container.querySelectorAll('.click-to-edit')).toHaveLength(1);
    expect(container.querySelectorAll('.click-to-remove')).toHaveLength(1);
  });

  it('supports granular withEdit factory permitting only edit actions', () => {
    const { container } = render(<JsonViewer src={{ count: 42 }} plugins={[withEdit(() => {})]} />);
    const row = container.querySelector('.variable-row');
    if (row) fireEvent.mouseEnter(row);

    expect(container.querySelectorAll('.click-to-edit')).toHaveLength(1);
    expect(container.querySelectorAll('.click-to-remove')).toHaveLength(0);
  });

  it('supports granular withDelete factory permitting only delete actions', () => {
    const { container } = render(
      <JsonViewer src={{ count: 42 }} plugins={[withDelete(() => {})]} />
    );
    const row = container.querySelector('.variable-row');
    if (row) fireEvent.mouseEnter(row);

    expect(container.querySelectorAll('.click-to-edit')).toHaveLength(0);
    expect(container.querySelectorAll('.click-to-remove')).toHaveLength(1);
  });

  it('initiates inline editing when clicking the edit icon', () => {
    const { container } = render(
      <JsonViewer src={{ greeting: 'hello' }} plugins={[withEdit(() => {})]} />
    );
    const row = container.querySelector('.variable-row');
    if (row) fireEvent.mouseEnter(row);

    const editBtn = container.querySelector('.click-to-edit-icon');
    expect(editBtn).not.toBeNull();
    if (editBtn) fireEvent.click(editBtn);

    const textarea = container.querySelector('.variable-editor') as HTMLTextAreaElement;
    expect(textarea).not.toBeNull();
    expect(textarea.value).toBe('hello');
  });

  it('initiates inline editing via Ctrl/Cmd + click on variable value', () => {
    const { container } = render(
      <JsonViewer src={{ title: 'Antigravity' }} plugins={[withEdit(() => {})]} />
    );
    const valueEl = container.querySelector('.variable-value');
    expect(valueEl).not.toBeNull();
    if (valueEl) {
      fireEvent.click(valueEl, { ctrlKey: true });
    }

    const textarea = container.querySelector('.variable-editor') as HTMLTextAreaElement;
    expect(textarea).not.toBeNull();
    expect(textarea.value).toBe('Antigravity');
  });

  it('cancels inline editing when Escape key is pressed', () => {
    const { container } = render(<JsonViewer src={{ age: 30 }} plugins={[withEdit(() => {})]} />);
    const row = container.querySelector('.variable-row');
    if (row) fireEvent.mouseEnter(row);

    const editBtn = container.querySelector('.click-to-edit-icon');
    if (editBtn) fireEvent.click(editBtn);

    const textarea = container.querySelector('.variable-editor') as HTMLTextAreaElement;
    fireEvent.keyDown(textarea, { key: 'Escape' });

    expect(container.querySelectorAll('.variable-editor')).toHaveLength(0);
  });

  it('submits edit and passes exact legacy payload to onEdit callback', () => {
    const handleEdit = vi.fn();
    const initialSrc = { city: 'Tokyo' };

    const { container } = render(
      <JsonViewer src={initialSrc} plugins={[withEditor({ onEdit: handleEdit })]} />
    );
    const row = container.querySelector('.variable-row');
    if (row) fireEvent.mouseEnter(row);

    const editBtn = container.querySelector('.click-to-edit-icon');
    if (editBtn) fireEvent.click(editBtn);

    const textarea = container.querySelector('.variable-editor') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Kyoto' } });

    const submitBtn = container.querySelector('.edit-check.string-value');
    if (submitBtn) fireEvent.click(submitBtn);

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith({
      existing_src: initialSrc,
      updated_src: { city: 'Kyoto' },
      name: 'city',
      namespace: ['root'],
      new_value: 'Kyoto',
      existing_value: 'Tokyo'
    });
    expect(container.querySelectorAll('.variable-editor')).toHaveLength(0);
  });

  it('triggers validation failure banner when onEdit returns false', () => {
    const handleEdit = vi.fn().mockReturnValue(false);

    const { container } = render(
      <JsonViewer
        src={{ score: 10 }}
        plugins={[withEditor({ onEdit: handleEdit, validationMessage: 'Score cannot change' })]}
      />
    );
    const row = container.querySelector('.variable-row');
    if (row) fireEvent.mouseEnter(row);

    const editBtn = container.querySelector('.click-to-edit-icon');
    if (editBtn) fireEvent.click(editBtn);

    const textarea = container.querySelector('.variable-editor') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '99' } });

    const submitBtn = container.querySelector('.edit-check.string-value');
    if (submitBtn) fireEvent.click(submitBtn);

    expect(container.querySelectorAll('.validation-failure')).toHaveLength(1);
    expect(container.querySelector('.validation-failure')?.textContent).toContain(
      'Score cannot change'
    );

    // Clicking banner dismisses it
    const banner = container.querySelector('.validation-failure');
    if (banner) fireEvent.click(banner);
    expect(container.querySelectorAll('.validation-failure')).toHaveLength(0);
  });
});
