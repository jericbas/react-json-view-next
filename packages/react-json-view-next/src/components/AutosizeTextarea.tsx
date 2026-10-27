import * as React from 'react';
import { useEffect, useImperativeHandle, useRef } from 'react';

export interface AutosizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
}

export const AutosizeTextarea = React.forwardRef<HTMLTextAreaElement, AutosizeTextareaProps>(
  ({ value, minRows = 2, style, className, placeholder, onChange, onKeyDown, ...rest }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

    useEffect(() => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = 'auto';
        const lineHeight = 18;
        const minHeight = minRows * lineHeight;
        el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`;
        el.focus();
      }
    }, [minRows]);

    return (
      <textarea
        ref={textareaRef}
        value={value}
        rows={minRows}
        placeholder={placeholder}
        className={className}
        onChange={e => {
          const el = e.currentTarget;
          el.style.height = 'auto';
          const lineHeight = 18;
          const minHeight = minRows * lineHeight;
          el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`;
          onChange?.(e);
        }}
        onKeyDown={onKeyDown}
        style={{
          boxSizing: 'border-box',
          resize: 'none',
          overflow: 'hidden',
          ...style
        }}
        {...rest}
      />
    );
  }
);

AutosizeTextarea.displayName = 'AutosizeTextarea';

export default AutosizeTextarea;
