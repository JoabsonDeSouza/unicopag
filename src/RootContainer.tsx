import { NavigationContainer } from '@react-navigation/native';
import { Suspense, useCallback, useEffect } from 'react';
import { Text } from 'react-native';
import { useThemeStore, useAppVersion } from 'store/settings';
import { ThemeProvider } from 'styled-components';
import { getThemeById } from 'theme/themes';
import { getAppVersion } from 'utils/getAppVersion';

import { ContextsProvider } from './contexts';
import Navigation from './routes';

const RootContainer: any = () => {
  const theme = useThemeStore((store) => store.theme);
  const setAppVersionName = useAppVersion((store) => store.changeAppVersion);
  const currentTheme: any = getThemeById(theme);

  const getAppVersionName = useCallback(async () => {
    const versionName = await getAppVersion();
    setAppVersionName(versionName);
  }, [setAppVersionName]);

  useEffect(() => {
    getAppVersionName();
  }, [getAppVersionName]);

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <ThemeProvider theme={currentTheme}>
        <ContextsProvider>
          <NavigationContainer theme={currentTheme}>
            <Navigation />
          </NavigationContainer>
        </ContextsProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default RootContainer;
