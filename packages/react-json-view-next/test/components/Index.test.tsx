import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Index, { type JsonViewPlugin } from '../../src/index';

describe('<Index /> (<JsonViewer /> Core)', () => {
  it('check data type labels from index', () => {
    const { container } = render(
      <Index
        src={{
          bool: true,
          str: 'test',
          int: 5,
          nan: NaN,
          null: null,
          func: () => {},
          obj: {
            arrChild: [1, 2, 'three'],
            objChild: {
              one: 1,
              two: 'two'
            }
          },
          arr: [[1, 'two'], { one: 'one', two: 2 }],
          regexp: /[0-9]/gi
        }}
      />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(14);
  });

  it('check object-size labels from index and toggling', () => {
    const testSrc = {
      bool: true,
      str: 'test',
      int: 5,
      nan: NaN,
      null: null,
      func: () => {},
      obj: {
        arrChild: [1, 2, 'three'],
        objChild: {
          one: 1,
          two: 'two'
        }
      },
      arr: [[1, 'two'], { one: 'one', two: 2 }],
      regexp: /[0-9]/gi
    };

    const { container, rerender } = render(
      <Index src={testSrc} displayObjectSize={true} displayDataTypes={true} />
    );
    expect(container.querySelectorAll('.object-size')).toHaveLength(7);

    rerender(<Index src={testSrc} displayObjectSize={false} displayDataTypes={true} />);
    expect(container.querySelectorAll('.object-size')).toHaveLength(0);
  });

  it('src replaced with error message on invalid input', () => {
    const { container } = render(
      <Index src={'{jsonEncodedString:true, createError:true}' as any} />
    );
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);
  });

  it('triggers read-only onSelect callback when variable value is clicked', () => {
    const onSelectMock = vi.fn();
    const { container } = render(
      <Index
        src={{
          name: 'antigravity',
          count: 42
        }}
        onSelect={onSelectMock}
      />
    );

    const variableValues = container.querySelectorAll('.variable-value');
    expect(variableValues.length).toBeGreaterThan(0);
    const firstValue = variableValues[0];
    expect(firstValue).toBeDefined();
    if (firstValue) {
      fireEvent.click(firstValue);
    }

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'name',
        value: 'antigravity',
        type: 'string',
        namespace: ['name']
      })
    );
  });

  it('supports plugin slots (rowActions, valueRender, rootOverlay, treeRender)', () => {
    const samplePlugin: JsonViewPlugin = {
      name: 'test-plugin',
      renderRowActions: ({ variable }) => (
        <button type="button" className="custom-action-btn">
          Action for {variable.name}
        </button>
      ),
      renderValue: ({ variable, defaultRender }) => {
        if (variable.name === 'special') {
          return <span className="custom-intercepted-value">CUSTOM: {String(variable.value)}</span>;
        }
        return defaultRender();
      },
      renderRootOverlay: () => <div className="custom-root-overlay">Plugin Overlay</div>,
      renderTree: ({ defaultRender }) => (
        <div className="custom-tree-wrapper">{defaultRender()}</div>
      )
    };

    const { container } = render(
      <Index
        src={{
          special: 'magic',
          regular: 'hello'
        }}
        plugins={[samplePlugin]}
      />
    );

    expect(container.querySelector('.custom-root-overlay')).not.toBeNull();
    expect(container.querySelector('.custom-tree-wrapper')).not.toBeNull();
    expect(container.querySelector('.custom-intercepted-value')).toHaveTextContent('CUSTOM: magic');
    // 1 action for root object + 2 actions for properties
    expect(container.querySelectorAll('.custom-action-btn')).toHaveLength(3);
  });

  it('updates displayed content when src prop changes', () => {
    const { container, rerender } = render(<Index src={{ test: true }} />);
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(1);

    rerender(<Index src={{ test1: true, test2: false }} />);
    expect(container.querySelectorAll('.data-type-label')).toHaveLength(2);
  });

  it('index can have ArrayGroup root component', () => {
    const { container } = render(
      <Index name="test" groupArraysAfterLength={5} src={new Array(15).fill(0)} />
    );
    expect(container.querySelectorAll('.array-group')).toHaveLength(3);
  });

  it('length is correct even if an object has a length property', () => {
    const { container } = render(
      <Index
        src={{
          first: 'first property',
          second: 'second property',
          length: 1000
        }}
      />
    );
    expect(container.querySelectorAll('.object-size')).toHaveLength(1);
  });
});
