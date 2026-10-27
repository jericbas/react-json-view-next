import type React from 'react';
import { Edit, RemoveCircle as Remove } from '../../../components/icons';
import type { ThemeKeys, ThemeObject } from '../../../types';
import { getEditorStyle } from '../style';

export interface VariableActionIconsProps {
  onEdit: boolean;
  onDelete: boolean;
  editMode: boolean;
  hovered: boolean;
  theme: ThemeKeys | ThemeObject;
  onStartEdit: () => void;
  onRemove: () => void;
}

export const VariableActionIcons: React.FC<VariableActionIconsProps> = ({
  onEdit,
  onDelete,
  editMode,
  hovered,
  theme,
  onStartEdit,
  onRemove
}) => {
  if (editMode) return null;

  return (
    <>
      {onEdit && (
        <div
          className="click-to-edit"
          style={{
            verticalAlign: 'top',
            display: hovered ? 'inline-block' : 'none'
          }}
        >
          <Edit
            className="click-to-edit-icon"
            {...getEditorStyle(theme, 'editVarIcon')}
            onClick={onStartEdit}
          />
        </div>
      )}
      {onDelete && (
        <div
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
        </div>
      )}
    </>
  );
};

export default VariableActionIcons;
