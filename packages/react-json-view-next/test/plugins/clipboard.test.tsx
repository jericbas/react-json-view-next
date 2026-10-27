import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import JsonViewer from '../../src/components/JsonViewer';
import { withClipboard } from '../../src/plugins/clipboard';

describe('withClipboard Plugin', () => {
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });
  });

  const sampleData = {
    user: {
      name: 'antigravity',
      age: 42,
      roles: ['admin', 'maintainer']
    }
  };

  it('renders clipboard action slot on primitive and object rows', () => {
    const { container } = render(<JsonViewer src={sampleData} plugins={[withClipboard()]} />);

    const copyContainers = container.querySelectorAll('.copy-to-clipboard-container');
    expect(copyContainers.length).toBeGreaterThan(0);
  });

  it('copies JSON-formatted value by default (format: "value")', async () => {
    const { container } = render(<JsonViewer src={sampleData} plugins={[withClipboard()]} />);

    const rows = container.querySelectorAll('.variable-row');
    expect(rows.length).toBeGreaterThan(0);
    const firstRow = rows[0];
    expect(firstRow).toBeDefined();

    const copyBtn = firstRow?.querySelector('.copy-to-clipboard-container > span');
    expect(copyBtn).not.toBeNull();
    fireEvent.click(copyBtn!);
    await Promise.resolve();

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    expect(writeTextMock).toHaveBeenCalledWith('"antigravity"');
  });

  it('copies property path when copyPath: true is configured', async () => {
    const { container } = render(
      <JsonViewer src={sampleData} plugins={[withClipboard({ copyPath: true })]} />
    );

    const rows = container.querySelectorAll('.variable-row');
    const nameRow = rows[0];
    const copyBtn = nameRow?.querySelector('.copy-to-clipboard-container > span');
    expect(copyBtn).not.toBeNull();
    fireEvent.click(copyBtn!);
    await Promise.resolve();

    expect(writeTextMock).toHaveBeenCalledWith('user.name');
  });

  it('copies property path when format: "path" is configured', async () => {
    const { container } = render(
      <JsonViewer src={sampleData} plugins={[withClipboard({ format: 'path' })]} />
    );

    const rows = container.querySelectorAll('.variable-row');
    const ageRow = rows[1];
    const copyBtn = ageRow?.querySelector('.copy-to-clipboard-container > span');
    expect(copyBtn).not.toBeNull();
    fireEvent.click(copyBtn!);
    await Promise.resolve();

    expect(writeTextMock).toHaveBeenCalledWith('user.age');
  });

  it('formats array item path using bracket notation', async () => {
    const { container } = render(
      <JsonViewer src={sampleData} plugins={[withClipboard({ copyPath: true })]} />
    );

    const rows = container.querySelectorAll('.variable-row');
    // rows: 0 -> name, 1 -> age, 2 -> roles[0], 3 -> roles[1]
    const roleRow = rows[2];
    const copyBtn = roleRow?.querySelector('.copy-to-clipboard-container > span');
    expect(copyBtn).not.toBeNull();
    fireEvent.click(copyBtn!);
    await Promise.resolve();

    expect(writeTextMock).toHaveBeenCalledWith('user.roles[0]');
  });

  it('supports custom format function receiving ClipboardContext', async () => {
    const customFormatter = vi.fn(ctx => `custom://${ctx.path}#${String(ctx.value)}`);

    const { container } = render(
      <JsonViewer src={sampleData} plugins={[withClipboard({ format: customFormatter })]} />
    );

    const rows = container.querySelectorAll('.variable-row');
    const firstRow = rows[0];
    const copyBtn = firstRow?.querySelector('.copy-to-clipboard-container > span');
    expect(copyBtn).not.toBeNull();
    fireEvent.click(copyBtn!);
    await Promise.resolve();

    expect(customFormatter).toHaveBeenCalledTimes(1);
    expect(customFormatter).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'user.name',
        value: 'antigravity',
        variable: expect.objectContaining({ name: 'name', value: 'antigravity' }),
        namespace: ['root', 'user', 'name']
      })
    );
    expect(writeTextMock).toHaveBeenCalledWith('custom://user.name#antigravity');
  });

  it('invokes callback / copyCallback with OnCopyProps', async () => {
    const callbackMock = vi.fn();
    const { container } = render(
      <JsonViewer src={sampleData} plugins={[withClipboard({ callback: callbackMock })]} />
    );

    const rows = container.querySelectorAll('.variable-row');
    const firstRow = rows[0];
    const copyBtn = firstRow?.querySelector('.copy-to-clipboard-container > span');
    expect(copyBtn).not.toBeNull();
    fireEvent.click(copyBtn!);
    await Promise.resolve();

    expect(callbackMock).toHaveBeenCalledTimes(1);
    expect(callbackMock).toHaveBeenCalledWith({
      src: 'antigravity',
      namespace: ['root', 'user', 'name'],
      name: 'name'
    });
  });

  it('supports copying container objects from ObjectMeta slot', async () => {
    const { container } = render(<JsonViewer src={sampleData} plugins={[withClipboard()]} />);

    const objectMetaSlots = container.querySelectorAll(
      '.object-key-val > .pushed-content .copy-to-clipboard-container > span'
    );
    expect(objectMetaSlots.length).toBeGreaterThan(0);
    const rootCopyBtn = objectMetaSlots[0];
    expect(rootCopyBtn).toBeDefined();
    if (rootCopyBtn) {
      fireEvent.click(rootCopyBtn);
    }
    await Promise.resolve();

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    expect(writeTextMock).toHaveBeenCalledWith(JSON.stringify(sampleData, null, '  '));
  });
});
