import type { ThemeKeys, ThemeObject } from '../types';
import { isTheme, toType } from './util';

export interface ValidatedProps {
  src: any;
  name: string | null | false;
  theme: ThemeKeys | ThemeObject;
  validationMessage: string;
}

export function isPromise<T = any>(val: any): val is Promise<T> {
  return (
    val !== null &&
    (typeof val === 'object' || typeof val === 'function') &&
    typeof (val as any).then === 'function'
  );
}

export function validateProps(
  srcProp: any,
  nameProp: string | null | false,
  themeProp: ThemeKeys | ThemeObject | undefined,
  validationMessageProp: string | undefined
): ValidatedProps {
  let theme: ThemeKeys | ThemeObject = themeProp ?? 'rjv-default';
  if (toType(theme) === 'object' && !isTheme(theme)) {
    console.error(
      'react-json-view-next error:',
      'theme prop must be a theme name or valid base-16 theme object.',
      'defaulting to "rjv-default" theme'
    );
    theme = 'rjv-default';
  }

  let src = srcProp;
  let name = nameProp;
  if (toType(src) !== 'object' && toType(src) !== 'array') {
    console.error('react-json-view-next error:', 'src property must be a valid json object');
    name = 'ERROR';
    src = {
      message: 'src property must be a valid json object'
    };
  }

  return {
    src,
    name,
    theme,
    validationMessage: validationMessageProp ?? 'Validation Error'
  };
}
