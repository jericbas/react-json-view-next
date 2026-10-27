import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { getClipboardStyle } from '../plugins/clipboard/style';
import type { ClipboardContext, ClipboardFormat } from '../plugins/clipboard/types';
import { formatClipboardValue, formatPath } from '../plugins/clipboard/util';
import type { JsonVariable, OnCopyProps, ThemeKeys, ThemeObject } from '../types';
import { Clippy } from './icons';

export interface CopyToClipboardProps {
  src?: unknown;
  theme?: ThemeKeys | ThemeObject | undefined;
  hidden?: boolean | undefined;
  rowHovered?: boolean | undefined;
  namespace?: Array<string | number | null> | undefined;
  clickCallback?: boolean | ((copy: OnCopyProps) => void) | undefined;
  callback?: boolean | ((copy: OnCopyProps) => void) | undefined;
  copyPath?: boolean | undefined;
  format?: ClipboardFormat | undefined;
  variable?: JsonVariable | undefined;
  depth?: number | undefined;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  src,
  theme = 'rjv-default',
  hidden = false,
  rowHovered = false,
  namespace = [],
  clickCallback,
  callback,
  copyPath = false,
  format = 'value',
  variable,
  depth = 0
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const effectiveCallback = callback ?? clickCallback;
  const valueToUse = variable ? variable.value : src;

  const getComputedText = (): string => {
    const pathString = formatPath(namespace);
    if (typeof format === 'function') {
      const ctx: ClipboardContext = {
        variable: variable ?? {
          name: namespace.length > 0 ? (namespace[namespace.length - 1] ?? '') : '',
          value: valueToUse,
          type: typeof valueToUse
        },
        namespace,
        path: pathString,
        value: valueToUse,
        depth
      };
      return format(ctx);
    }
    if (format === 'path' || copyPath) {
      return pathString;
    }
    return formatClipboardValue(valueToUse);
  };

  const handleCopy = () => {
    const textToCopy = getComputedText();

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(() => {
        copyFallback(textToCopy);
      });
    } else {
      copyFallback(textToCopy);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCopied(false);
    }, 5500);

    setCopied(true);

    if (typeof effectiveCallback === 'function') {
      effectiveCallback({
        src: valueToUse,
        namespace: namespace,
        name: namespace.length > 0 ? (namespace[namespace.length - 1] ?? null) : null
      });
    }
  };

  const copyFallback = (text: string) => {
    const container = document.createElement('textarea');
    container.value = text;
    document.body.appendChild(container);
    container.select();
    try {
      document.execCommand('copy');
    } catch {
      // no-op
    }
    document.body.removeChild(container);
  };

  const getClippyIcon = () => {
    if (copied) {
      return (
        <span>
          <Clippy className="copy-icon" {...getClipboardStyle(theme, 'copy-icon')} />
          <span {...getClipboardStyle(theme, 'copy-icon-copied')}>✔</span>
        </span>
      );
    }

    return <Clippy className="copy-icon" {...getClipboardStyle(theme, 'copy-icon')} />;
  };

  const style = getClipboardStyle(theme, 'copy-to-clipboard').style;
  const display = hidden ? 'none' : 'inline';

  return (
    <span
      className="copy-to-clipboard-container"
      title="Copy to clipboard"
      style={{
        verticalAlign: 'top',
        display: rowHovered ? 'inline-block' : 'none'
      }}
    >
      <span
        style={{
          ...style,
          display: display
        }}
        onClick={handleCopy}
      >
        {getClippyIcon()}
      </span>
    </span>
  );
};

export default CopyToClipboard;
