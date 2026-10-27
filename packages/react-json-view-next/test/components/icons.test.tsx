import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Add,
  AddCircle,
  ArrowDown,
  ArrowRight,
  CheckCircle,
  CircleMinus,
  CirclePlus,
  Clippy,
  Edit,
  RemoveCircle,
  SquareMinus,
  SquarePlus
} from '../../src/components/icons';

describe('svg icons', () => {
  it('<CircleMinus /> sanity check', () => {
    const { container } = render(<CircleMinus />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<CirclePlus /> sanity check', () => {
    const { container } = render(<CirclePlus />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<SquarePlus /> sanity check', () => {
    const { container } = render(<SquarePlus />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<SquareMinus /> sanity check', () => {
    const { container } = render(<SquareMinus />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<ArrowDown /> sanity check', () => {
    const { container } = render(<ArrowDown />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<ArrowRight /> sanity check', () => {
    const { container } = render(<ArrowRight />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<Clippy /> sanity check', () => {
    const { container } = render(<Clippy />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<RemoveCircle /> sanity check', () => {
    const { container } = render(<RemoveCircle />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<AddCircle /> sanity check', () => {
    const { container } = render(<AddCircle />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<Add /> sanity check', () => {
    const { container } = render(<Add />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<Edit /> sanity check', () => {
    const { container } = render(<Edit />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('<CheckCircle /> sanity check', () => {
    const { container } = render(<CheckCircle />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('icon with color', () => {
    const { container } = render(<CheckCircle style={{ color: 'green' }} />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });
});
