import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import JsonViewer from '../../src/components/JsonViewer';
import { withClipboard } from '../../src/plugins/clipboard';
import { withAdd, withDelete, withEditor } from '../../src/plugins/editor';

describe('withEditor Container & Composition Interactions', () => {
  it('renders add and delete action icons on object and array containers', () => {
    const { container } = render(
      <JsonViewer
        src={{ list: [1, 2], details: { flag: true } }}
        plugins={[withEditor({ onAdd: () => {}, onDelete: () => {} })]}
      />
    );

    const rows = container.querySelectorAll('.object-key-val');
    const targetRow = rows[1];
    expect(targetRow).toBeDefined();
    if (targetRow) {
      fireEvent.mouseEnter(targetRow);
      const addIcon = targetRow.querySelector('.click-to-add') as HTMLElement;
      expect(addIcon).not.toBeNull();
      expect(addIcon.style.display).toBe('inline-block');
    }
  });

  it('adds an item to an array when clicking the add icon', () => {
    const handleAdd = vi.fn();
    const initialSrc = { items: ['apple'] };

    const { container } = render(
      <JsonViewer src={initialSrc} plugins={[withAdd(handleAdd, { defaultValue: 'banana' })]} />
    );

    const rows = container.querySelectorAll('.object-key-val');
    const targetRow = rows[1];
    expect(targetRow).toBeDefined();
    if (targetRow) {
      fireEvent.mouseEnter(targetRow);
      const addBtn = targetRow.querySelector('.click-to-add-icon');
      expect(addBtn).not.toBeNull();
      if (addBtn) fireEvent.click(addBtn);
    }

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith({
      existing_src: initialSrc,
      updated_src: { items: ['apple', 'banana'] },
      name: 'items',
      namespace: ['root'],
      new_value: ['apple', 'banana'],
      existing_value: ['apple']
    });
  });

  it('opens add-key modal and adds key to object on submit', () => {
    const handleAdd = vi.fn();
    const initialSrc = { user: { name: 'Alice' } };

    const { container } = render(
      <JsonViewer
        src={initialSrc}
        plugins={[withAdd(handleAdd, { defaultValue: 'default-val' })]}
      />
    );

    const rows = container.querySelectorAll('.object-key-val');
    const targetRow = rows[1];
    expect(targetRow).toBeDefined();
    if (targetRow) {
      fireEvent.mouseEnter(targetRow);
      const addBtn = targetRow.querySelector('.click-to-add-icon');
      if (addBtn) fireEvent.click(addBtn);
    }

    const modalInput = container.querySelector('.key-modal-input') as HTMLInputElement;
    expect(modalInput).not.toBeNull();

    fireEvent.change(modalInput, { target: { value: 'role' } });
    const modalSubmit = container.querySelector('.key-modal-submit');
    if (modalSubmit) fireEvent.click(modalSubmit);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith({
      existing_src: initialSrc,
      updated_src: { user: { name: 'Alice', role: 'default-val' } },
      name: 'user',
      namespace: ['root'],
      new_value: { name: 'Alice', role: 'default-val' },
      existing_value: { name: 'Alice' }
    });
  });

  it('deletes variable and calls onDelete callback with legacy payload', () => {
    const handleDelete = vi.fn();
    const initialSrc = { keep: 1, removeMe: 2 };

    const { container } = render(
      <JsonViewer src={initialSrc} plugins={[withDelete(handleDelete)]} />
    );

    const rows = container.querySelectorAll('.variable-row');
    const targetRow = rows[1];
    expect(targetRow).toBeDefined();
    if (targetRow) {
      fireEvent.mouseEnter(targetRow);
      const removeBtn = targetRow.querySelector('.click-to-remove-icon');
      expect(removeBtn).not.toBeNull();
      if (removeBtn) fireEvent.click(removeBtn);
    }

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith({
      existing_src: initialSrc,
      updated_src: { keep: 1 },
      name: 'removeMe',
      namespace: ['root'],
      new_value: undefined,
      existing_value: 2
    });
  });

  it('hides CopyToClipboard icon when a primitive row is in edit mode', () => {
    const { container } = render(
      <JsonViewer
        src={{ username: 'alice' }}
        plugins={[withClipboard(), withEditor({ onEdit: () => {} })]}
      />
    );

    const row = container.querySelector('.variable-row');
    if (row) fireEvent.mouseEnter(row);

    const copyBtn = container.querySelector('.copy-to-clipboard-container span[style*="inline"]');
    expect(copyBtn).not.toBeNull();

    const editBtn = container.querySelector('.click-to-edit-icon');
    if (editBtn) fireEvent.click(editBtn);

    const hiddenCopy = container.querySelector(
      '.copy-to-clipboard-container span[style*="display: none"]'
    );
    expect(hiddenCopy).not.toBeNull();
  });
});
