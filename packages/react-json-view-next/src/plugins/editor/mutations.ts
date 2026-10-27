import type { JsonVariable } from '../../types/variable';
import type {
  AddKeyRequestState,
  InteractionProps,
  OnAddOption,
  OnDeleteOption,
  OnEditOption
} from './types';
import updateSrc from './updateSrc';

export function getParentNamespace(
  namespace: Array<string | number | null>,
  name: string | number | null
): Array<string | number | null> {
  if (namespace.length > 0 && namespace[namespace.length - 1] === name) {
    return namespace.slice(0, -1);
  }
  return namespace;
}

export function executeEdit(params: {
  currentSrc: any;
  name: string | number;
  namespace: Array<string | number | null>;
  existingValue: any;
  newValue: any;
  onEdit?: OnEditOption | undefined;
}): { updatedSrc: any; isValid: boolean } {
  const targetNamespace = getParentNamespace(params.namespace, params.name);
  const updatedSrc = updateSrc(params.currentSrc, {
    name: params.name,
    namespace: targetNamespace,
    new_value: params.newValue,
    existing_value: params.existingValue,
    variable_removed: false
  });
  const payload: InteractionProps = {
    existing_src: params.currentSrc,
    updated_src: updatedSrc,
    name: params.name,
    namespace: targetNamespace,
    new_value: params.newValue,
    existing_value: params.existingValue
  };
  let isValid = true;
  if (typeof params.onEdit === 'function') {
    const res = params.onEdit(payload);
    if (res === false) isValid = false;
  }
  return { updatedSrc, isValid };
}

export function executeDeleteVariable(params: {
  currentSrc: any;
  variable: JsonVariable;
  namespace: Array<string | number | null>;
  onDelete?: OnDeleteOption | undefined;
}): { updatedSrc: any; isValid: boolean } {
  const { name, value: existingValue } = params.variable;
  const targetNamespace = getParentNamespace(params.namespace, name);
  const updatedSrc = updateSrc(params.currentSrc, {
    name,
    namespace: targetNamespace,
    existing_value: existingValue,
    variable_removed: true
  });
  const payload: InteractionProps = {
    existing_src: params.currentSrc,
    updated_src: updatedSrc,
    name,
    namespace: targetNamespace,
    new_value: undefined,
    existing_value: existingValue
  };
  let isValid = true;
  if (typeof params.onDelete === 'function') {
    const res = params.onDelete(payload);
    if (res === false) isValid = false;
  }
  return { updatedSrc, isValid };
}

export function executeDeleteObject(params: {
  currentSrc: any;
  variable: JsonVariable;
  namespace: Array<string | number | null>;
  depth: number;
  onDelete?: OnDeleteOption | undefined;
}): { updatedSrc: any; isValid: boolean } {
  const targetNamespace = getParentNamespace(
    params.namespace,
    params.depth > 0 ? (params.variable.name ?? null) : null
  );
  const name = params.depth > 0 ? (params.variable.name ?? null) : null;
  const updatedSrc = updateSrc(params.currentSrc, {
    name,
    namespace: targetNamespace,
    existing_value: params.variable.value,
    variable_removed: true
  });
  const payload: InteractionProps = {
    existing_src: params.currentSrc,
    updated_src: updatedSrc,
    name,
    namespace: targetNamespace,
    new_value: undefined,
    existing_value: params.variable.value
  };
  let isValid = true;
  if (typeof params.onDelete === 'function') {
    const res = params.onDelete(payload);
    if (res === false) isValid = false;
  }
  return { updatedSrc, isValid };
}

export function executeAddKey(params: {
  currentSrc: any;
  addKeyRequest: AddKeyRequestState;
  keyName: string;
  defaultValue: any;
  onAdd?: OnAddOption | undefined;
}): { updatedSrc: any; isValid: boolean } {
  const { existing_value, namespace, name, depth } = params.addKeyRequest;
  const newValue = { ...existing_value, [params.keyName]: params.defaultValue };
  const targetNamespace = getParentNamespace(namespace, depth > 0 ? (name ?? null) : null);
  const updatedSrc = updateSrc(params.currentSrc, {
    name: depth > 0 ? (name ?? null) : null,
    namespace: targetNamespace,
    existing_value,
    new_value: newValue,
    variable_removed: false
  });
  const payload: InteractionProps = {
    existing_src: params.currentSrc,
    updated_src: updatedSrc,
    name: depth > 0 ? (name ?? null) : null,
    namespace: targetNamespace,
    new_value: newValue,
    existing_value
  };
  let isValid = true;
  if (typeof params.onAdd === 'function') {
    const res = params.onAdd(payload);
    if (res === false) isValid = false;
  }
  return { updatedSrc, isValid };
}

export function executeAddArrayItem(params: {
  currentSrc: any;
  variable: JsonVariable;
  namespace: Array<string | number | null>;
  depth: number;
  defaultValue: any;
  onAdd?: OnAddOption | undefined;
}): { updatedSrc: any; isValid: boolean } {
  const name = params.depth > 0 ? (params.variable.name ?? null) : null;
  const targetNamespace = getParentNamespace(params.namespace, name);
  const existingArr = Array.isArray(params.variable.value) ? params.variable.value : [];
  const newValue = [...existingArr, params.defaultValue];
  const updatedSrc = updateSrc(params.currentSrc, {
    name,
    namespace: targetNamespace,
    existing_value: params.variable.value,
    new_value: newValue,
    variable_removed: false
  });
  const payload: InteractionProps = {
    existing_src: params.currentSrc,
    updated_src: updatedSrc,
    name,
    namespace: targetNamespace,
    new_value: newValue,
    existing_value: params.variable.value
  };
  let isValid = true;
  if (typeof params.onAdd === 'function') {
    const res = params.onAdd(payload);
    if (res === false) isValid = false;
  }
  return { updatedSrc, isValid };
}
