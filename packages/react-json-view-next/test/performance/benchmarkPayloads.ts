export function createSmallJson() {
  return {
    string: 'this is a test string',
    integer: 42,
    float: 114.514,
    boolean: true,
    null: null,
    nan: NaN,
    undefined: undefined,
    date: new Date('2026-10-23T12:00:00Z'),
    array: [1, 2, 'three', true, null],
    nested: {
      first: 'first nested item',
      second: 2,
      third: {
        inner: 'deeply nested value'
      }
    }
  };
}

export function createMediumJson(count = 50) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Record #${i + 1}`,
    score: (i * 17) % 100,
    active: i % 2 === 0,
    tags: ['tagA', 'tagB', 'tagC']
  }));
}

export function createDeepNestedJson(depth = 25) {
  let current: Record<string, unknown> = { leaf: 'bottom_value', depth };
  for (let i = depth - 1; i >= 1; i--) {
    current = { [`level_${i}`]: current };
  }
  return current;
}

export function createLargeArray(count = 500) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Item #${i + 1}`,
    value: i * 1.5,
    active: i % 2 === 0
  }));
}
