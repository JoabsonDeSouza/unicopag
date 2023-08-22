import { useTheme } from 'styled-components';

import { Container, PageLayout } from './styles';
import { StatusBar } from 'react-native';
import Loading from 'components/Loading';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'routes/types';

const CreateAccount = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const webViewRef = useRef<any>();
  const navigation = useNavigation<NavigationProps<''>>();

  const webViewMessageHandler = (newNavState: any) => {
    console.log('webViewMessageHandler', newNavState);
    const { canGoBack, url } = newNavState;

    if (canGoBack || url.includes('https://app.unicopag.com.br/login')) {
      navigation.goBack();
    }
  };

  return (
    <Container>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={'light-content'}
      />

      <PageLayout
        ref={webViewRef}
        androidLayerType="software"
        source={{ uri: 'https://app.unicopag.com.br/register' }}
        onNavigationStateChange={webViewMessageHandler}
        originWhitelist={['*']}
        thirdPartyCookiesEnabled={true}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        domStorageEnabled={true}
      />
      {loading && <Loading />}
    </Container>
  );
};

export default CreateAccount;
