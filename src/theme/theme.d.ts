import 'styled-components';

import { TextStyle } from 'react-native';

export interface Colors {
  dark: string;
  border: string;
  dark_gray: string;
  gray: string;
  primary: string;
  white: string;
  secondary: string;
  background: string;
  drawerBackground: string;
  error: string;
}

export type Types =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5'
  | 'button1'
  | 'button2'
  | 'button3'
  | 'button4'
  | 'button5'
  | 'radioLabel'
  | 'caption'
  | 'overline'
  | 'tag';

export interface TypeScale {
  [key: string]: TextStyle;
}

export interface Theme {
  id: string;
  colors: Colors;
  typography: TypeScale;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    typography: TypeScale;
    id: string;
  }
}
