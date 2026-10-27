import type React from 'react';
import { useEffect, useState } from 'react';
import { useJsonView } from '../context/JsonViewContext';
import Theme from '../themes/getStyle';
import type { JsonVariable, OnSelectProps, ThemeKeys, ThemeObject } from '../types';
import { renderDefaultDataType } from './renderDefaultDataType';
import { VariableKeyLabel } from './VariableEditor/VariableKeyLabel';

export interface VariableRowProps {
  variable: JsonVariable;
  singleIndent: number;
  type?: string | undefined;
  theme?: ThemeKeys | ThemeObject | undefined;
  namespace: Array<string | number | null>;
  indentWidth?: number | undefined;
  onSelect?: ((select: OnSelectProps) => void) | false | undefined;
  displayArrayKey?: boolean | undefined;
  quotesOnKeys?: boolean | undefined;
  rjvId?: string | undefined;
  collapseStringsAfterLength?: number | false | undefined;
  displayDataTypes?: boolean | undefined;
  depth?: number | undefined;
}

export const VariableRow: React.FC<VariableRowProps> = props => {
  const context = useJsonView();
  const {
    variable,
    singleIndent,
    type,
    theme = context.theme || 'rjv-default',
    namespace,
    indentWidth = 4,
    onSelect = false,
    displayArrayKey = true,
    quotesOnKeys = true,
    rjvId,
    collapseStringsAfterLength = false,
    displayDataTypes = true,
    depth = 0
  } = props;

  const [hovered, setHovered] = useState<boolean>(false);
  const [, setTick] = useState(0);
  const plugins = context.plugins || [];

  useEffect(() => {
    const unsubs = plugins
      .map(p => (p as any).subscribe?.(() => setTick(t => t + 1)))
      .filter(Boolean);
    return () => {
      unsubs.forEach((fn: any) => {
        fn();
      });
    };
  }, [plugins]);

  const isEditing = plugins.some(p => p.isEditing?.(variable, namespace));

  const defaultRender = () =>
    renderDefaultDataType(
      variable,
      theme,
      namespace,
      displayDataTypes,
      collapseStringsAfterLength,
      rjvId
    );

  let renderedValue: React.ReactNode;
  for (const plugin of plugins) {
    if (plugin.renderValue) {
      const intercepted = plugin.renderValue({
        variable,
        namespace,
        theme,
        depth,
        displayDataTypes,
        collapseStringsAfterLength,
        defaultRender
      });
      if (intercepted !== undefined) {
        renderedValue = intercepted;
        break;
      }
    }
  }

  if (renderedValue === undefined) {
    renderedValue = defaultRender();
  }

  const handleSelect =
    onSelect === false || isEditing
      ? undefined
      : () => {
          const location = [...namespace];
          location.shift();
          onSelect({
            name: String(variable.name),
            value: variable.value,
            type: variable.type,
            namespace: location
          });
        };

  const handleValueClick = (e: React.MouseEvent) => {
    for (const plugin of plugins) {
      if (plugin.onValueClick) {
        const handled = plugin.onValueClick({
          variable,
          namespace,
          theme,
          depth,
          event: e
        });
        if (handled) return;
      }
    }
    if (handleSelect) {
      handleSelect();
    }
  };

  return (
    <div
      {...Theme(theme, 'objectKeyVal', {
        paddingLeft: indentWidth * singleIndent
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="variable-row"
      key={String(variable.name)}
    >
      <VariableKeyLabel
        type={type}
        displayArrayKey={displayArrayKey}
        theme={theme}
        variable={variable}
        namespace={namespace}
        quotesOnKeys={quotesOnKeys}
      />
      <div
        className="variable-value"
        onClick={handleValueClick}
        {...Theme(theme, 'variableValue', {
          cursor: onSelect === false ? 'default' : 'pointer'
        })}
      >
        {renderedValue}
      </div>
      {plugins.map((plugin, idx) => {
        const actionNode = plugin.renderRowActions?.({
          variable,
          namespace,
          theme,
          hovered,
          depth,
          isEditing
        });
        return actionNode ? (
          <span key={plugin.name || `action-${idx}`} className="row-action-slot">
            {actionNode}
          </span>
        ) : null;
      })}
    </div>
  );
};

export default VariableRow;
