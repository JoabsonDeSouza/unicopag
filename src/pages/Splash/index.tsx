import { useNavigation } from '@react-navigation/native';
import { getToken, getRememberLogin } from 'datastore/configurations';
import { useCallback, useEffect } from 'react';
import { MAIN, AUTH } from 'routes/screenNames';
import { NavigationProps } from 'routes/types';
import logo from 'assets/logo_splash.png';

import { Container } from './styles';
import { Image } from 'react-native';

const Splash = () => {
  const navigation = useNavigation<NavigationProps<''>>();

  const checkToken = useCallback(async () => {
    const token = await getToken();
    const rememberLogin = await getRememberLogin();

    setTimeout(() => {
      if (rememberLogin && token) {
        navigation.replace(MAIN);
        return;
      }
      navigation.replace(AUTH);
    }, 1000);
  }, [navigation]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <Container>
      <Image
        source={logo}
        style={{ width: 200, height: 100, resizeMode: 'contain' }}
      />
    </Container>
  );
};

export default Splash;
