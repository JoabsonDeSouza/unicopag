import typography from 'theme/typography';

import { Colors, Theme } from './theme';

const colors: Colors = {
  dark: '#272A42',
  border: '#83859D',
  dark_gray: '#6A707C',
  gray: '#8391A1',
  primary: '#7F84FF',
  white: '#FFFFFF',
  secondary: '#D2D3E8',
  background: '#30334E',
  drawerBackground: '#1D1B27',
  error: 'red',
};

const theme: Theme = {
  id: 'dark',
  colors,
  typography,
};

export default theme;
