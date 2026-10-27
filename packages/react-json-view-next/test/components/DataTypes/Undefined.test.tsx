import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonUndefined from '../../../src/components/DataTypes/Undefined';

describe('<JsonUndefined />', () => {
  it('Undefined component should not have data type label (display types enabled)', () => {
    const { container } = render(<JsonUndefined displayDataTypes={true} theme="rjv-default" />);
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });

  it('Undefined component should not have data type label (display types disabled)', () => {
    const { container } = render(<JsonUndefined displayDataTypes={false} theme="rjv-default" />);
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });
});
