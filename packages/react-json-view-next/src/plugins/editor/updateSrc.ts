import { toType } from '../../helpers/util';

export function deepCopy(src: any, copy_namespace: Array<string | number>): any {
  const type = toType(src);
  let result: any;
  const idx = copy_namespace.shift();
  if (type === 'array') {
    result = [...src];
  } else if (type === 'object') {
    result = { ...src };
  }
  if (idx !== undefined && result !== undefined) {
    result[idx] = deepCopy(src[idx], copy_namespace);
  }
  return result;
}

export function updateSrc(src: any, request: any): any {
  const { name, new_value, variable_removed } = request;
  const namespace = [...request.namespace];

  namespace.shift();

  // deeply copy src
  let updated_src = deepCopy(src, [...namespace]);

  // point at current index
  let walk: any = updated_src;
  for (const idx of namespace) {
    walk = walk[idx];
  }

  if (variable_removed) {
    if (toType(walk) === 'array') {
      walk.splice(name, 1);
    } else {
      delete walk[name];
    }
  } else {
    // update copied variable at specified namespace
    if (name !== null && name !== undefined) {
      walk[name] = new_value;
    } else {
      updated_src = new_value;
    }
  }

  return updated_src;
}

export default updateSrc;
