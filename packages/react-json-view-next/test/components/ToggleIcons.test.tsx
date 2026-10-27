import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CollapsedIcon, ExpandedIcon } from '../../src/components/ToggleIcons';

describe('<ToggleIcons />', () => {
  it('ExpandedIcon mount', () => {
    const { container } = render(<ExpandedIcon theme="rjv-default" />);
    expect(container.querySelectorAll('.expanded-icon')).toHaveLength(1);
  });

  it('CollapsedIcon mount', () => {
    const { container } = render(<CollapsedIcon theme="rjv-default" />);
    expect(container.querySelectorAll('.collapsed-icon')).toHaveLength(1);
  });

  it('ExpandedIcon with triangle style', () => {
    const { container } = render(<ExpandedIcon theme="rjv-default" iconStyle="triangle" />);
    expect(container.querySelectorAll('.expanded-icon')).toHaveLength(1);
    expect(container.querySelector('svg')).toBeDefined();
  });

  it('ExpandedIcon with square style', () => {
    const { container } = render(<ExpandedIcon theme="rjv-default" iconStyle="square" />);
    expect(container.querySelectorAll('.expanded-icon')).toHaveLength(1);
    expect(container.querySelector('svg')).toBeDefined();
  });

  it('ExpandedIcon with no style (circle default)', () => {
    const { container } = render(<ExpandedIcon theme="rjv-default" />);
    expect(container.querySelectorAll('.expanded-icon')).toHaveLength(1);
    expect(container.querySelector('svg')).toBeDefined();
  });

  it('CollapsedIcon with triangle style', () => {
    const { container } = render(<CollapsedIcon theme="rjv-default" iconStyle="triangle" />);
    expect(container.querySelectorAll('.collapsed-icon')).toHaveLength(1);
    expect(container.querySelector('svg')).toBeDefined();
  });

  it('CollapsedIcon with square style', () => {
    const { container } = render(<CollapsedIcon theme="rjv-default" iconStyle="square" />);
    expect(container.querySelectorAll('.collapsed-icon')).toHaveLength(1);
    expect(container.querySelector('svg')).toBeDefined();
  });

  it('CollapsedIcon with no style (circle default)', () => {
    const { container } = render(<CollapsedIcon theme="rjv-default" />);
    expect(container.querySelectorAll('.collapsed-icon')).toHaveLength(1);
    expect(container.querySelector('svg')).toBeDefined();
  });
});
