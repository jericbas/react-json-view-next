import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ArrayGroup from '../../src/components/ArrayGroup';

describe('<ArrayGroup />', () => {
  const largeArray = new Array(15).fill('test');

  it('ArrayGroup mount', () => {
    const { container } = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name="test"
        src={largeArray}
        theme="rjv-default"
        jsvRoot={false}
        indentWidth={4}
      />
    );
    expect(container.querySelectorAll('.array-group')).toHaveLength(3);
  });

  it('ArrayGroup expands and collapses', () => {
    const { container } = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name="test"
        src={largeArray}
        theme="rjv-default"
        jsvRoot={false}
        indentWidth={4}
      />
    );

    const brace = container.querySelector('.array-group-brace');
    expect(brace).not.toBeNull();
    if (brace) {
      fireEvent.click(brace);
    }

    expect(container.querySelectorAll('.expanded-icon')).toHaveLength(1);

    const iconContainer = container.querySelector('.array-group .icon-container');
    expect(iconContainer).not.toBeNull();
    if (iconContainer) {
      fireEvent.click(iconContainer);
    }

    expect(container.querySelectorAll('.expanded-icon')).toHaveLength(0);
  });

  it('ArrayGroup displays items on expansion', () => {
    const { container } = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name="test"
        src={largeArray}
        theme="rjv-default"
        jsvRoot={false}
        indentWidth={4}
      />
    );

    const brace = container.querySelector('.array-group-brace');
    if (brace) {
      fireEvent.click(brace);
    }

    // First group of 5 expanded: should show 5 string items
    expect(container.querySelectorAll('.string-value')).toHaveLength(5);
  });

  it('ArrayGroup paginates groups accurately', () => {
    const testArray = new Array(17).fill('test');
    const { container } = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name="test"
        src={testArray}
        theme="rjv-default"
        jsvRoot={false}
        indentWidth={4}
      />
    );

    expect(container.querySelectorAll('.array-group')).toHaveLength(4);

    const braces = container.querySelectorAll('.array-group-brace');
    // expand the last (4th) group which has 17 - 15 = 2 items
    const lastBrace = braces[3];
    if (lastBrace) {
      fireEvent.click(lastBrace);
    }
    expect(container.querySelectorAll('.string-value')).toHaveLength(2);
  });

  it('ArrayGroup renders at root', () => {
    const { container } = render(
      <ArrayGroup
        groupArraysAfterLength={5}
        namespace={['test']}
        name="test"
        src={largeArray}
        theme="rjv-default"
        jsvRoot={true}
        indentWidth={4}
      />
    );
    expect(container.querySelectorAll('.array-group')).toHaveLength(3);
  });
});
