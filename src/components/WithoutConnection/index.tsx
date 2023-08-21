import { useApp } from 'contexts/app';
import { useCallback } from 'react';
import logo from 'assets/logo.png';

import { Container, ContainerLogo } from './styles';
import { Image } from 'react-native';

const WithoutConnection = () => {
  const { showWithoutConnect } = useApp();

  const handleNavigateLogin = useCallback(() => {
    showWithoutConnect(false);
  }, [showWithoutConnect]);

  return (
    <Container>
      <ContainerLogo>
        <Image
          source={logo}
          style={{ width: 200, height: 100, resizeMode: 'contain' }}
        />
      </ContainerLogo>
    </Container>
  );
};

export default WithoutConnection;
