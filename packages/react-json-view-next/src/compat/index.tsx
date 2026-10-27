import type React from 'react';
import { useMemo } from 'react';
import { JsonViewer } from '../components/JsonViewer';
import { withClipboard } from '../plugins/clipboard/index';
import { withEditor } from '../plugins/editor/index';
import type { OnAddOption, OnDeleteOption, OnEditOption } from '../plugins/editor/types';
import { base16Themes } from '../themes/index';
import type { JsonViewerProps, JsonViewPlugin, ThemeKeys, ThemeObject } from '../types';

export interface ReactJsonCompatProps extends Omit<JsonViewerProps, 'theme'> {
  theme?: ThemeKeys | ThemeObject | boolean;
  enableClipboard?: boolean | ((copy: any) => void);
  onEdit?: OnEditOption;
  onAdd?: OnAddOption;
  onDelete?: OnDeleteOption;
  defaultValue?: any;
  validationMessage?: string;
  plugins?: JsonViewPlugin[];
  [key: string]: any;
}

export type ReactJsonViewProps = ReactJsonCompatProps;

export const ReactJsonCompat: React.FC<ReactJsonCompatProps> = ({
  src,
  theme = 'rjv-default',
  enableClipboard = true,
  onEdit,
  onAdd,
  onDelete,
  defaultValue,
  validationMessage,
  plugins: userPlugins,
  ...restProps
}) => {
  const resolvedTheme: ThemeKeys | ThemeObject = useMemo(() => {
    if (theme === false || theme === 'none') {
      return 'rjv-grey';
    }
    if (typeof theme === 'string' && base16Themes[theme]) {
      return base16Themes[theme];
    }
    if (typeof theme === 'object') {
      return theme;
    }
    return (theme as ThemeKeys) || 'rjv-default';
  }, [theme]);

  const plugins = useMemo(() => {
    const list: JsonViewPlugin[] = [...(userPlugins || [])];

    const hasEditor = list.some(p => p.name === 'editor');
    if (!hasEditor && (onEdit || onAdd || onDelete)) {
      list.push(
        withEditor({
          onEdit: typeof onEdit === 'function' ? onEdit : undefined,
          onAdd: typeof onAdd === 'function' ? onAdd : undefined,
          onDelete: typeof onDelete === 'function' ? onDelete : undefined,
          defaultValue,
          validationMessage
        })
      );
    }

    const hasClipboard = list.some(p => p.name === 'clipboard');
    if (!hasClipboard && enableClipboard !== false) {
      list.push(
        withClipboard({
          callback: typeof enableClipboard === 'function' ? enableClipboard : undefined
        })
      );
    }

    return list;
  }, [userPlugins, onEdit, onAdd, onDelete, defaultValue, validationMessage, enableClipboard]);

  return <JsonViewer src={src} theme={resolvedTheme} plugins={plugins} {...restProps} />;
};

export const ReactJsonView = ReactJsonCompat;
export default ReactJsonCompat;
