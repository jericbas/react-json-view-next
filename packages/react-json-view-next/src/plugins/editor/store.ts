import type { JsonVariable } from '../../types/variable';
import parseInput from './parseInput';
import stringifyVariable from './stringifyVariable';
import type { AddKeyRequestState, EditorState } from './types';

export function getRowKey(namespace: Array<string | number | null>, name: string | number): string {
  return `${namespace.map(s => String(s)).join('.')}/${String(name)}`;
}

export class EditorStore {
  private state: EditorState;
  private listeners: Set<() => void> = new Set();

  constructor(defaultValidationMessage = 'Validation Error') {
    this.state = {
      activeEdit: null,
      editValue: '',
      parsedInput: { type: false, value: null },
      addKeyRequest: null,
      validationFailure: false,
      validationMessage: defaultValidationMessage
    };
  }

  getState = (): EditorState => this.state;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  notify = (): void => {
    for (const listener of this.listeners) {
      listener();
    }
  };

  setState = (partial: Partial<EditorState>): void => {
    this.state = { ...this.state, ...partial };
    this.notify();
  };

  isEditing = (variable: JsonVariable, namespace: Array<string | number | null>): boolean => {
    if (!this.state.activeEdit) return false;
    return this.state.activeEdit.key === getRowKey(namespace, variable.name);
  };

  startEdit = (variable: JsonVariable, namespace: Array<string | number | null>): void => {
    const stringified = stringifyVariable(variable.value);
    const detected = parseInput(stringified);
    this.setState({
      activeEdit: {
        key: getRowKey(namespace, variable.name),
        name: variable.name,
        namespace,
        value: variable.value,
        type: variable.type
      },
      editValue: stringified,
      parsedInput: detected,
      validationFailure: false
    });
  };

  setEditValue = (val: string): void => {
    const detected = parseInput(val);
    this.setState({ editValue: val, parsedInput: detected });
  };

  cancelEdit = (): void => {
    this.setState({
      activeEdit: null,
      editValue: '',
      parsedInput: { type: false, value: null }
    });
  };

  requestAddKey = (request: AddKeyRequestState): void => {
    this.setState({ addKeyRequest: request, validationFailure: false });
  };

  cancelAddKey = (): void => {
    this.setState({ addKeyRequest: null });
  };

  dismissValidationFailure = (): void => {
    this.setState({ validationFailure: false });
  };
}

export default EditorStore;
