import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonDate from '../../../src/components/DataTypes/Date';

describe('<JsonDate />', () => {
  it('date component should have a data type label', () => {
    const { container } = render(
      <JsonDate value={new Date()} displayDataTypes={true} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);
  });

  it('date component should not have a data type label', () => {
    const { container } = render(
      <JsonDate value={new Date()} displayDataTypes={false} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });
});
