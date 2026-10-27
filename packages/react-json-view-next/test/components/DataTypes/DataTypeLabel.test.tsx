import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DataTypeLabel from '../../../src/components/DataTypes/DataTypeLabel';

describe('<DataTypeLabel />', () => {
  it('DataTypeLabel should exist when displayDataTypes is true', () => {
    const { container } = render(
      <DataTypeLabel type_name="test" displayDataTypes={true} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);
  });

  it('DataTypeLabel should not exist when displayDataTypes is false', () => {
    const { container } = render(
      <DataTypeLabel type_name="test" displayDataTypes={false} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });
});
