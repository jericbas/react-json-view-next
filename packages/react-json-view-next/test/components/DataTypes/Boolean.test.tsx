import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonBoolean from '../../../src/components/DataTypes/Boolean';

describe('<JsonBoolean />', () => {
  it('bool component should have a data type label: True', () => {
    const { container } = render(
      <JsonBoolean value={true} displayDataTypes={true} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);
  });

  it('bool component should not have a data type label: True', () => {
    const { container } = render(
      <JsonBoolean value={true} displayDataTypes={false} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });

  it('bool component should have a data type label: False', () => {
    const { container } = render(
      <JsonBoolean value={false} displayDataTypes={true} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);
  });

  it('bool component should not have a data type label: False', () => {
    const { container } = render(
      <JsonBoolean value={false} displayDataTypes={false} theme="rjv-default" />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(0);
  });
});
