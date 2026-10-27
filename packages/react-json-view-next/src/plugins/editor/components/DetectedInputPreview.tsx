import type React from 'react';
import {
  JsonBoolean,
  JsonDate,
  JsonFloat,
  JsonFunction,
  JsonInteger,
  JsonNan,
  JsonNull,
  JsonRegexp,
  JsonString,
  JsonUndefined
} from '../../../components/DataTypes/DataTypes';
import { CheckCircle } from '../../../components/icons';
import Theme from '../../../themes/getStyle';
import type { ThemeKeys, ThemeObject } from '../../../types';
import type { ParsedInput } from '../parseInput';
import { getEditorStyle } from '../style';

export interface DetectedInputPreviewProps {
  parsedInput: ParsedInput;
  theme: ThemeKeys | ThemeObject;
  namespace: Array<string | number | null>;
  onSubmit: () => void;
  [key: string]: any;
}

export const DetectedInputPreview: React.FC<DetectedInputPreviewProps> = ({
  parsedInput,
  theme,
  namespace,
  onSubmit,
  ...restProps
}) => {
  const { type: detectedType, value } = parsedInput;

  if (detectedType === false) return null;

  let detectedElement: React.ReactNode = null;

  switch (detectedType.toLowerCase()) {
    case 'object':
      detectedElement = (
        <span>
          <span style={{ ...Theme(theme, 'brace').style, cursor: 'default' }}>{'{'}</span>
          <span style={{ ...Theme(theme, 'ellipsis').style, cursor: 'default' }}>...</span>
          <span style={{ ...Theme(theme, 'brace').style, cursor: 'default' }}>{'}'}</span>
        </span>
      );
      break;
    case 'array':
      detectedElement = (
        <span>
          <span style={{ ...Theme(theme, 'brace').style, cursor: 'default' }}>{'['}</span>
          <span style={{ ...Theme(theme, 'ellipsis').style, cursor: 'default' }}>...</span>
          <span style={{ ...Theme(theme, 'brace').style, cursor: 'default' }}>{']'}</span>
        </span>
      );
      break;
    case 'string':
      detectedElement = (
        <JsonString value={value as string} theme={theme} namespace={namespace} {...restProps} />
      );
      break;
    case 'integer':
      detectedElement = <JsonInteger value={value as number} theme={theme} {...restProps} />;
      break;
    case 'float':
      detectedElement = <JsonFloat value={value as number} theme={theme} {...restProps} />;
      break;
    case 'boolean':
      detectedElement = <JsonBoolean value={value as boolean} theme={theme} {...restProps} />;
      break;
    case 'function':
      detectedElement = (
        <JsonFunction
          value={value as (...args: unknown[]) => unknown}
          theme={theme}
          namespace={namespace}
          {...restProps}
        />
      );
      break;
    case 'null':
      detectedElement = <JsonNull theme={theme} {...restProps} />;
      break;
    case 'nan':
      detectedElement = <JsonNan theme={theme} {...restProps} />;
      break;
    case 'undefined':
      detectedElement = <JsonUndefined theme={theme} {...restProps} />;
      break;
    case 'date':
      detectedElement = (
        <JsonDate value={new Date(value as string | number)} theme={theme} {...restProps} />
      );
      break;
    case 'regexp':
      detectedElement = <JsonRegexp value={value as RegExp} theme={theme} {...restProps} />;
      break;
  }

  if (!detectedElement) return null;

  return (
    <div>
      <div {...getEditorStyle(theme, 'detected-row')}>
        {detectedElement}
        <CheckCircle
          className="edit-check detected"
          style={{
            verticalAlign: 'top',
            paddingLeft: '3px',
            ...getEditorStyle(theme, 'check-icon').style
          }}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default DetectedInputPreview;
