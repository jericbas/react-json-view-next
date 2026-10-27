import type React from 'react';
import Theme from '../themes/getStyle';
import type { IconStyle, ThemeKeys, ThemeObject } from '../types';
import { ArrowDown, ArrowRight, CircleMinus, CirclePlus, SquareMinus, SquarePlus } from './icons';

export interface ToggleIconProps {
  theme?: ThemeKeys | ThemeObject;
  iconStyle?: IconStyle;
}

export const ExpandedIcon: React.FC<ToggleIconProps> = ({
  theme = 'rjv-default',
  iconStyle = 'triangle'
}) => {
  switch (iconStyle) {
    case 'triangle':
      return <ArrowDown {...Theme(theme, 'expanded-icon')} className="expanded-icon" />;
    case 'square':
      return <SquareMinus {...Theme(theme, 'expanded-icon')} className="expanded-icon" />;
    default:
      return <CircleMinus {...Theme(theme, 'expanded-icon')} className="expanded-icon" />;
  }
};

export const CollapsedIcon: React.FC<ToggleIconProps> = ({
  theme = 'rjv-default',
  iconStyle = 'triangle'
}) => {
  switch (iconStyle) {
    case 'triangle':
      return <ArrowRight {...Theme(theme, 'collapsed-icon')} className="collapsed-icon" />;
    case 'square':
      return <SquarePlus {...Theme(theme, 'collapsed-icon')} className="collapsed-icon" />;
    default:
      return <CirclePlus {...Theme(theme, 'collapsed-icon')} className="collapsed-icon" />;
  }
};
