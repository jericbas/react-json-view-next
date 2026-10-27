export interface ParsedInput {
  type: string | false;
  value: unknown;
}

export function parseInput(input: string): ParsedInput {
  input = input.trim();
  try {
    const parsed = JSON.parse(input);
    const serialized = JSON.stringify(parsed);
    if (serialized[0] === '[') {
      return formatResponse('array', parsed);
    }
    if (serialized[0] === '{') {
      return formatResponse('object', parsed);
    }
    if (input.match(/^-?\d+\.\d+$/)) {
      return formatResponse('float', parseFloat(input));
    }
    if (input.match(/^-?\d+e-\d+$/)) {
      return formatResponse('float', Number(input));
    }
    if (input.match(/^-?\d+$/)) {
      return formatResponse('integer', parseInt(input, 10));
    }
    if (input.match(/^-?\d+e\+\d+$/)) {
      return formatResponse('integer', Number(input));
    }
  } catch {
    // no-op
  }

  const lower = input.toLowerCase();
  switch (lower) {
    case 'undefined':
      return formatResponse('undefined', undefined);
    case 'nan':
      return formatResponse('nan', NaN);
    case 'null':
      return formatResponse('null', null);
    case 'true':
      return formatResponse('boolean', true);
    case 'false':
      return formatResponse('boolean', false);
    default: {
      const parsedDate = Date.parse(input);
      if (!Number.isNaN(parsedDate)) {
        return formatResponse('date', new Date(parsedDate));
      }
    }
  }

  return formatResponse(false, null);
}

function formatResponse(type: string | false, value: unknown): ParsedInput {
  return {
    type,
    value
  };
}

export default parseInput;
