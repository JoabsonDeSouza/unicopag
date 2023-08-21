import { StackNavigationProp } from '@react-navigation/stack';

type RouteParams = {
  screen?: string;
  params?: unknown;
  screenOptions?: unknown;
};

export type RootStackParamList = {
  [key: string]: RouteParams | undefined;
};

export type NavigationProps<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
