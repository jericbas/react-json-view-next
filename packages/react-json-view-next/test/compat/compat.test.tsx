import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReactJsonCompat, { ReactJsonView } from '../../src/compat/index';

describe('ReactJsonCompat (<ReactJsonView /> legacy drop-in bridge)', () => {
  it('renders JSON viewer tree with default props', () => {
    const data = { hello: 'world', count: 42 };
    render(<ReactJsonCompat src={data} />);

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('"world"')).toBeInTheDocument();
    expect(screen.getByText('count')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('exports ReactJsonView as alias and default export', () => {
    expect(ReactJsonView).toBe(ReactJsonCompat);
  });

  it('automatically enables clipboard by default', () => {
    const data = { copyMe: 'secret' };
    const { container } = render(<ReactJsonCompat src={data} />);

    const copyBtn = container.querySelector('.copy-to-clipboard-container');
    expect(copyBtn).toBeInTheDocument();
  });

  it('disables clipboard when enableClipboard={false}', () => {
    const data = { copyMe: 'secret' };
    const { container } = render(<ReactJsonCompat src={data} enableClipboard={false} />);

    const copyBtn = container.querySelector('.copy-to-clipboard-container');
    expect(copyBtn).not.toBeInTheDocument();
  });

  it('automatically wires editor plugin when onEdit is provided', () => {
    const onEdit = vi.fn();
    const data = { editable: 'initial' };
    const { container } = render(<ReactJsonCompat src={data} onEdit={onEdit} />);

    const editBtn = container.querySelector('.click-to-edit');
    expect(editBtn).toBeInTheDocument();
  });

  it('automatically wires editor plugin when onAdd is provided', () => {
    const onAdd = vi.fn();
    const data = { obj: { child: 1 } };
    const { container } = render(<ReactJsonCompat src={data} onAdd={onAdd} />);

    const addBtn = container.querySelector('.click-to-add');
    expect(addBtn).toBeInTheDocument();
  });

  it('automatically wires editor plugin when onDelete is provided', () => {
    const onDelete = vi.fn();
    const data = { obj: { child: 1 } };
    const { container } = render(<ReactJsonCompat src={data} onDelete={onDelete} />);

    const removeBtn = container.querySelector('.click-to-remove');
    expect(removeBtn).toBeInTheDocument();
  });

  it('does not wire editor plugin when no edit handlers are passed', () => {
    const data = { readOnly: true };
    const { container } = render(<ReactJsonCompat src={data} />);

    expect(container.querySelector('.click-to-edit')).not.toBeInTheDocument();
    expect(container.querySelector('.click-to-add')).not.toBeInTheDocument();
    expect(container.querySelector('.click-to-remove')).not.toBeInTheDocument();
  });

  it('resolves Base16 string themes automatically (e.g. monokai)', () => {
    const data = { name: 'monokai-test' };
    const { container } = render(<ReactJsonCompat src={data} theme="monokai" />);

    const appContainer = container.querySelector('.react-json-view');
    expect(appContainer).toBeInTheDocument();
    expect(appContainer).toHaveStyle({ backgroundColor: '#272822' });
  });

  it('accepts custom ThemeObject directly', () => {
    const customTheme = {
      base00: '#123456',
      base01: '#234567',
      base02: '#345678',
      base03: '#456789',
      base04: '#56789a',
      base05: '#6789ab',
      base06: '#789abc',
      base07: '#89abcd',
      base08: '#9abcde',
      base09: '#abcdef',
      base0A: '#bcdef0',
      base0B: '#cdef01',
      base0C: '#def012',
      base0D: '#ef0123',
      base0E: '#f01234',
      base0F: '#012345'
    };
    const data = { custom: true };
    const { container } = render(<ReactJsonCompat src={data} theme={customTheme} />);

    const appContainer = container.querySelector('.react-json-view');
    expect(appContainer).toHaveStyle({ backgroundColor: '#123456' });
  });
});
