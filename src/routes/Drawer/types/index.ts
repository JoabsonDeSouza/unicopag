import { DefaultTheme } from 'styled-components/native';

export type ListProps = {
  id: string;
  label: string;
  icon?: string;
  color?: string;
  active: boolean;
  routeName: string;
};

export type DrawerItemProps = {
  id: string;
  label: string;
  routeName: string;
};

export interface Props {
  theme: DefaultTheme;
  headerList: ListProps[];
  footerList: ListProps[];
}
