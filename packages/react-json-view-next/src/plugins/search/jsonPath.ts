export interface JsonPathResult {
  path: string;
  value: any;
}

export function evaluateJsonPath(root: any, expr: string): JsonPathResult[] {
  if (!expr || typeof expr !== 'string') return [];
  const trimmed = expr.trim();
  if (!trimmed.startsWith('$')) return [];

  const results: JsonPathResult[] = [];

  // Recursive descent: $..prop
  if (trimmed.startsWith('$..')) {
    const targetKey = trimmed.slice(3).trim();
    if (!targetKey) return [];
    traverseRecursive(root, '$', targetKey, results);
    return results;
  }

  // Parse path segments: $.a.b[0].c or $[0].a
  const segments = parsePathSegments(trimmed.slice(1));
  traverseSegments(root, '$', segments, 0, results);
  return results;
}

function parsePathSegments(pathStr: string): string[] {
  const segments: string[] = [];
  const regex = /\.?([^.[\]]+)|\[['"]?([^'"]+)['"]?\]|\[(\d+)\]|\[\*\]/g;
  let match: RegExpExecArray | null;

  while (true) {
    match = regex.exec(pathStr);
    if (!match) break;
    const token = match[1] ?? match[2] ?? match[3] ?? '*';
    if (token) segments.push(token);
  }

  return segments;
}

function traverseSegments(
  current: any,
  currentPath: string,
  segments: string[],
  index: number,
  results: JsonPathResult[]
): void {
  if (current === undefined || current === null) return;

  if (index >= segments.length) {
    results.push({ path: currentPath, value: current });
    return;
  }

  const seg = segments[index];
  if (!seg) return;

  if (seg === '*') {
    if (Array.isArray(current)) {
      for (let i = 0; i < current.length; i++) {
        traverseSegments(current[i], `${currentPath}[${i}]`, segments, index + 1, results);
      }
    } else if (typeof current === 'object') {
      for (const [key, val] of Object.entries(current)) {
        traverseSegments(val, `${currentPath}.${key}`, segments, index + 1, results);
      }
    }
    return;
  }

  if (Array.isArray(current)) {
    const numIdx = Number(seg);
    if (!Number.isNaN(numIdx) && numIdx in current) {
      traverseSegments(current[numIdx], `${currentPath}[${numIdx}]`, segments, index + 1, results);
    }
  } else if (typeof current === 'object' && seg in current) {
    traverseSegments(current[seg], `${currentPath}.${seg}`, segments, index + 1, results);
  }
}

function traverseRecursive(
  current: any,
  currentPath: string,
  targetKey: string,
  results: JsonPathResult[]
): void {
  if (current === undefined || current === null || typeof current !== 'object') return;

  if (Array.isArray(current)) {
    for (let i = 0; i < current.length; i++) {
      traverseRecursive(current[i], `${currentPath}[${i}]`, targetKey, results);
    }
    return;
  }

  for (const [key, val] of Object.entries(current)) {
    const nextPath = `${currentPath}.${key}`;
    if (key === targetKey) {
      results.push({ path: nextPath, value: val });
    }
    traverseRecursive(val, nextPath, targetKey, results);
  }
}
