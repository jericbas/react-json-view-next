import type { FlatRow } from './types';

export function flattenTree(
  src: any,
  rootName: string | number | null | false = 'root',
  expandedSet: Set<string>
): FlatRow[] {
  const rows: FlatRow[] = [];
  const rootKey = rootName === false ? '' : String(rootName ?? 'root');
  const rootNamespace: Array<string | number | null> = [rootName === false ? null : rootName];

  if (src === null || typeof src !== 'object') {
    rows.push({
      id: 'root',
      key: rootKey,
      value: src,
      depth: 0,
      type: 'primitive',
      isContainer: false,
      isExpanded: false,
      hasChildren: false,
      namespace: rootNamespace
    });
    return rows;
  }

  const isArr = Array.isArray(src);
  const rootId = 'root';
  const isExpanded = expandedSet.has(rootId);
  const keys = Object.keys(src);

  rows.push({
    id: rootId,
    key: rootKey,
    value: isArr ? '[' : '{',
    depth: 0,
    type: isArr ? 'array' : 'object',
    isContainer: true,
    isExpanded,
    hasChildren: keys.length > 0,
    itemCount: keys.length,
    namespace: rootNamespace
  });

  if (isExpanded) {
    flattenChildren(src, rootNamespace, rootId, 1, expandedSet, rows);

    rows.push({
      id: `${rootId}-closing`,
      key: '',
      value: isArr ? ']' : '}',
      depth: 0,
      type: isArr ? 'array' : 'object',
      isContainer: false,
      isExpanded: false,
      hasChildren: false,
      isClosingBrace: true,
      namespace: rootNamespace
    });
  }

  return rows;
}

function flattenChildren(
  parent: any,
  parentNamespace: Array<string | number | null>,
  parentId: string,
  depth: number,
  expandedSet: Set<string>,
  rows: FlatRow[]
): void {
  const isArr = Array.isArray(parent);
  const entries = Object.entries(parent);

  for (const [key, val] of entries) {
    const childNamespace = [...parentNamespace, isArr ? Number(key) : key];
    const childId = `${parentId}.${key}`;

    if (val !== null && typeof val === 'object') {
      const childIsArr = Array.isArray(val);
      const isExpanded = expandedSet.has(childId);
      const childKeys = Object.keys(val);

      rows.push({
        id: childId,
        key,
        value: childIsArr ? '[' : '{',
        depth,
        type: childIsArr ? 'array' : 'object',
        isContainer: true,
        isExpanded,
        hasChildren: childKeys.length > 0,
        itemCount: childKeys.length,
        namespace: childNamespace
      });

      if (isExpanded) {
        flattenChildren(val, childNamespace, childId, depth + 1, expandedSet, rows);

        rows.push({
          id: `${childId}-closing`,
          key: '',
          value: childIsArr ? ']' : '}',
          depth,
          type: childIsArr ? 'array' : 'object',
          isContainer: false,
          isExpanded: false,
          hasChildren: false,
          isClosingBrace: true,
          namespace: childNamespace
        });
      }
    } else {
      rows.push({
        id: childId,
        key,
        value: val,
        depth,
        type: 'primitive',
        isContainer: false,
        isExpanded: false,
        hasChildren: false,
        namespace: childNamespace
      });
    }
  }
}
