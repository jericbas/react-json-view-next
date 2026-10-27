import type { TypeDefaultValue } from '../../types';
import type { ParsedInput } from './parseInput';

export interface InteractionProps {
  existing_src: any;
  new_value: any;
  updated_src: any;
  name: string | number | null;
  namespace: Array<string | number | null>;
  existing_value: any;
}

export type OnEditHandler = (edit: InteractionProps) => false | unknown;
export type OnAddHandler = (add: InteractionProps) => false | unknown;
export type OnDeleteHandler = (del: InteractionProps) => false | unknown;

export type OnEditOption = OnEditHandler | boolean;
export type OnAddOption = OnAddHandler | boolean;
export type OnDeleteOption = OnDeleteHandler | boolean;

export interface EditorPluginOptions {
  onEdit?: OnEditOption | undefined;
  onAdd?: OnAddOption | undefined;
  onDelete?: OnDeleteOption | undefined;
  defaultValue?: TypeDefaultValue | TypeDefaultValue[] | null | undefined;
  validationMessage?: string | undefined;
}

export interface ActiveEditState {
  key: string;
  name: string | number;
  namespace: Array<string | number | null>;
  value: any;
  type: string;
}

export interface AddKeyRequestState {
  existing_value: any;
  namespace: Array<string | number | null>;
  name: string | number | null;
  depth: number;
}

export interface EditorState {
  activeEdit: ActiveEditState | null;
  editValue: string;
  parsedInput: ParsedInput;
  addKeyRequest: AddKeyRequestState | null;
  validationFailure: boolean;
  validationMessage: string;
}
