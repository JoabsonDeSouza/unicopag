import 'styled-components/native';

import darkTheme from 'theme/theme.dark';

export type Theme = typeof darkTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {
    name: 'dark' | 'light';
    elevation: number;
  }
}
