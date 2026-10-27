import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ValidationFailure from '../../src/components/ValidationFailure';
import Index from '../../src/index';

describe('<ValidationFailure />', () => {
  it('ValidationFailure should be on page when active', () => {
    const { container } = render(<ValidationFailure active={true} theme="rjv-default" />);
    expect(container.querySelectorAll('.validation-failure')).toHaveLength(1);
  });

  it('ValidationFailure should not be on page when inactive', () => {
    const { container } = render(<ValidationFailure active={false} theme="rjv-default" />);
    expect(container.querySelectorAll('.validation-failure')).toHaveLength(0);
  });

  it('ValidationFailure touch click event', () => {
    const { container } = render(<ValidationFailure active={true} theme="rjv-default" />);
    const el = container.querySelector('.validation-failure');
    expect(el).not.toBeNull();
    if (el) {
      fireEvent.click(el);
    }
  });

  it('ValidationFailure disabled with ValidationMessage on Index', () => {
    const { container } = render(<Index src={{}} validationMessage="custom validation" />);
    expect(container.querySelectorAll('.validation-failure')).toHaveLength(0);
  });

  it('ValidationFailure displays custom message', () => {
    const { container } = render(
      <ValidationFailure active={true} theme="rjv-default" message="custom validation" />
    );
    expect(container.querySelector('.validation-failure')?.textContent).toContain(
      'custom validation'
    );
  });
});
