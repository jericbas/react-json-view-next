import type React from 'react';
import type { ThemeKeys, ThemeObject } from './theme';
import type { JsonVariable } from './variable';

export interface RowActionContext {
  variable: JsonVariable;
  namespace: Array<string | number | null>;
  theme: ThemeKeys | ThemeObject;
  hovered: boolean;
  depth: number;
  isEditing?: boolean | undefined;
}

export interface ValueRenderContext {
  variable: JsonVariable;
  namespace: Array<string | number | null>;
  theme: ThemeKeys | ThemeObject;
  depth: number;
  displayDataTypes?: boolean;
  collapseStringsAfterLength?: number | false;
  defaultRender: () => React.ReactNode;
}

export interface RootOverlayContext {
  rjvId: string;
  theme: ThemeKeys | ThemeObject;
  src: any;
}

export interface TreeRenderContext {
  src: any;
  name: string | number | null | false;
  theme: ThemeKeys | ThemeObject;
  depth: number;
  namespace: Array<string | number | null>;
  defaultRender: () => React.ReactNode;
}

export interface ValueClickContext {
  variable: JsonVariable;
  namespace: Array<string | number | null>;
  theme: ThemeKeys | ThemeObject;
  depth: number;
  event: React.MouseEvent;
}

export interface JsonViewPlugin {
  name: string;
  renderRowActions?: (context: RowActionContext) => React.ReactNode;
  renderValue?: (context: ValueRenderContext) => React.ReactNode | undefined;
  renderRootOverlay?: (context: RootOverlayContext) => React.ReactNode;
  renderTree?: (context: TreeRenderContext) => React.ReactNode | undefined;
  onValueClick?: (context: ValueClickContext) => boolean | undefined;
  isEditing?: (variable: JsonVariable, namespace: Array<string | number | null>) => boolean;
}
