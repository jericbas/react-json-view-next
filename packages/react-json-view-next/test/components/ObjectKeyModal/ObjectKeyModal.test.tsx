import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ObjectKeyModal from '../../../src/components/ObjectKeyModal/ObjectKeyModal';

describe('<ObjectKeyModal />', () => {
  it('ObjectKeyModal input change', () => {
    const { container } = render(
      <ObjectKeyModal input="test" isValid={() => true} submit={() => {}} theme="rjv-default" />
    );

    const inputEl = container.querySelector('.key-modal-input') as HTMLInputElement;
    expect(inputEl).toBeDefined();
    expect(inputEl.value).toBe('test');

    fireEvent.change(inputEl, { target: { value: 'tests' } });
    expect(inputEl.value).toBe('tests');
  });

  it('ObjectKeyModal invalid input hides submit', () => {
    let validCounter = 0;
    const { container } = render(
      <ObjectKeyModal
        input="test"
        isValid={input => {
          validCounter++;
          return input !== 'invalid';
        }}
        submit={() => {}}
        theme="rjv-default"
      />
    );

    expect(container.querySelectorAll('.key-modal-submit')).toHaveLength(1);
    const inputEl = container.querySelector('.key-modal-input') as HTMLInputElement;

    fireEvent.change(inputEl, { target: { value: 'invalid' } });
    expect(inputEl.value).toBe('invalid');
    expect(container.querySelectorAll('.key-modal-submit')).toHaveLength(0);
    expect(validCounter).toBeGreaterThanOrEqual(2);
  });

  it('ObjectKeyModal test submit click', () => {
    const submitFn = vi.fn();
    const { container } = render(
      <ObjectKeyModal input="test" isValid={() => true} submit={submitFn} theme="rjv-default" />
    );

    const submitBtn = container.querySelector('.key-modal-submit');
    expect(submitBtn).not.toBeNull();
    if (submitBtn) {
      fireEvent.click(submitBtn);
    }
    expect(submitFn).toHaveBeenCalledWith('test');
  });

  it('ObjectKeyModal simulate modal cancel click', () => {
    const { container } = render(
      <ObjectKeyModal input="test" isValid={() => true} submit={() => {}} theme="rjv-default" />
    );

    const cancelBtn = container.querySelector('.key-modal-cancel');
    expect(cancelBtn).not.toBeNull();
    if (cancelBtn) {
      fireEvent.click(cancelBtn);
    }
  });

  it('ObjectKeyModal submit with Enter key press', () => {
    const submitFn = vi.fn();
    const { container } = render(
      <ObjectKeyModal input="test" isValid={() => true} submit={submitFn} theme="rjv-default" />
    );

    const inputEl = container.querySelector('.key-modal-input') as HTMLInputElement;
    fireEvent.keyDown(inputEl, { key: 'Enter' });
    expect(submitFn).toHaveBeenCalledWith('test');
  });

  it('ObjectKeyModal close with Escape key press', () => {
    const submitFn = vi.fn();
    const { container } = render(
      <ObjectKeyModal input="test" isValid={() => true} submit={submitFn} theme="rjv-default" />
    );

    const inputEl = container.querySelector('.key-modal-input') as HTMLInputElement;
    fireEvent.keyDown(inputEl, { key: 'Escape' });
    expect(submitFn).not.toHaveBeenCalled();
  });
});
