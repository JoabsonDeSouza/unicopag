import { DefaultTheme } from 'styled-components/native';

import dark from './theme.dark';
import light from './theme.light';

interface Themes {
  [key: string]: DefaultTheme;
}

const themes: Themes = { light, dark };

export const getThemes = (): Themes => themes;

export const getThemeById = (name: 'dark' | 'light'): DefaultTheme =>
  themes[name] || light;

export const setTheme = (name: string, theme: DefaultTheme) =>
  (themes[name] = theme || light);
