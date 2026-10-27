import { toType } from '../../helpers/util';

export function stringifyVariable(value: unknown): string {
  const type = toType(value);
  let string_value: string;
  switch (type) {
    case 'undefined':
      string_value = 'undefined';
      break;
    case 'nan':
      string_value = 'NaN';
      break;
    case 'string':
      string_value = value as string;
      break;
    case 'date':
      string_value = (value as Date).toString();
      break;
    case 'function':
      string_value = (value as (...args: unknown[]) => unknown).toString();
      break;
    case 'regexp':
      string_value = (value as RegExp).toString();
      break;
    default: {
      try {
        string_value = JSON.stringify(value, null, '  ');
      } catch {
        string_value = '';
      }
    }
  }

  return string_value;
}

export default stringifyVariable;
