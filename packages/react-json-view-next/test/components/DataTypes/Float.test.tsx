import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonFloat from '../../../src/components/DataTypes/Float';

describe('<JsonFloat />', () => {
  it('float component should have a data type label', () => {
    const { container } = render(
      <JsonFloat value={1.25} displayDataTypes={true} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);
  });

  it('float component should not have a data type label', () => {
    const { container } = render(
      <JsonFloat value={1.25} displayDataTypes={false} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });
});
