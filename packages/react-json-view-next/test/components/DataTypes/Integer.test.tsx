import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonInteger from '../../../src/components/DataTypes/Integer';

describe('<JsonInteger />', () => {
  it('integer component should have a data type label', () => {
    const { container } = render(
      <JsonInteger value={1} displayDataTypes={true} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);
  });

  it('integer component should not have a data type label', () => {
    const { container } = render(
      <JsonInteger value={1} displayDataTypes={false} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });
});
