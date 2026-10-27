import type React from 'react';
import { AddCircle as Add, RemoveCircle as Remove } from '../../../components/icons';
import type { ThemeKeys, ThemeObject } from '../../../types';
import { getEditorStyle } from '../style';

export interface ObjectActionIconsProps {
  onAdd: boolean;
  onDelete: boolean;
  hovered: boolean;
  theme: ThemeKeys | ThemeObject;
  canDelete: boolean;
  onStartAdd: () => void;
  onRemove: () => void;
}

export const ObjectActionIcons: React.FC<ObjectActionIconsProps> = ({
  onAdd,
  onDelete,
  hovered,
  theme,
  canDelete,
  onStartAdd,
  onRemove
}) => {
  return (
    <>
      {onAdd && (
        <span
          className="click-to-add"
          style={{
            verticalAlign: 'top',
            display: hovered ? 'inline-block' : 'none'
          }}
        >
          <Add
            className="click-to-add-icon"
            {...getEditorStyle(theme, 'addVarIcon')}
            onClick={onStartAdd}
          />
        </span>
      )}
      {onDelete && canDelete && (
        <span
          className="click-to-remove"
          style={{
            verticalAlign: 'top',
            display: hovered ? 'inline-block' : 'none'
          }}
        >
          <Remove
            className="click-to-remove-icon"
            {...getEditorStyle(theme, 'removeVarIcon')}
            onClick={onRemove}
          />
        </span>
      )}
    </>
  );
};

export default ObjectActionIcons;
