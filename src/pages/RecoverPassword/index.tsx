import { useNavigation } from '@react-navigation/native';
import logo from 'assets/logo.png';
import KeyboardAvoiding from 'components/KeyboardAvoiding';
import { useApp } from 'contexts/app';
import useConnectivity from 'hook/useConnectivity';
import { useCallback, useRef, useState } from 'react';
import { TouchableOpacity, View, Image, Keyboard } from 'react-native';
import { NavigationProps } from 'routes/types';
import { useJwtTokenStore } from 'store/settings';
import { validateEmail } from 'utils/validations';
import { TextInput, Text, Button, Card, Snackbar } from 'react-native-paper';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ContainerLogo,
  ContainerFields,
  ContainerError,
} from './styles';
import { ResponseLogin } from 'queries/auth/types';
import useFetchRecoverPassword from 'queries/auth/useFetchRecoverPassword';

const emailWrong = 'Digite um e-mail valido';

const ImageLogo = (
  <Image
    source={logo}
    style={{ width: 200, height: 100, resizeMode: 'contain' }}
  />
);

const RecoverPassword = () => {
  const isConnected = useConnectivity();
  const theme = useTheme();

  const { showWithoutConnect } = useApp();

  const { mutateAsync, isLoading } = useFetchRecoverPassword();
  const { setJwtToken } = useJwtTokenStore((store) => store);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps<''>>();
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState({
    email: '',
  });
  const [visible, setVisible] = useState<boolean>(false);

  const onDismissSnackBar = () => {
    setVisible(false);
    navigation.goBack();
  };

  const onError = (error: any) => {
    setErrorMessage(error.message);
    setShowError(true);
  };

  const onSuccess = useCallback(async () => {
    setVisible(true);
  }, [email, navigation, setJwtToken]);

  const handleRecoverPassword = useCallback(async () => {
    if (!isConnected) {
      showWithoutConnect(true);
      return;
    }

    if (!email || !validateEmail(email)) {
      setErrors({
        email: emailWrong,
      });
      return;
    }

    await mutateAsync({ email }, { onError, onSuccess });
  }, [
    isConnected,
    email,
    mutateAsync,
    onSuccess,
    showWithoutConnect,
    errors.email,
  ]);

  const clearErrors = useCallback(() => {
    setErrors({
      email: '',
    });
  }, []);

  return (
    <KeyboardAvoiding>
      <Container>
        <Card
          style={{
            width: '90%',
            paddingHorizontal: 30,
            paddingTop: 20,
            paddingBottom: 30,
            backgroundColor: theme.colors.background,
          }}>
          <ContainerLogo>{ImageLogo}</ContainerLogo>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 16,
              fontWeight: '700',
              color: theme.colors.secondary,
            }}
            variant="headlineSmall">
            Recupere seu acesso 🔒
          </Text>

          <Text
            style={{
              color: theme.colors.border,
            }}>
            Informe seu e-mail para receber as instruções de alteração da sua
            senha.
          </Text>
          <ContainerFields>
            <TextInput
              style={{
                width: '100%',
                marginBottom: 15,
                backgroundColor: theme.colors.background,
              }}
              outlineStyle={{
                borderColor: !!errors.email
                  ? theme.colors.error
                  : theme.colors.border,
              }}
              activeOutlineColor={theme.colors.secondary}
              textColor={theme.colors.secondary}
              label={'Email'}
              value={email}
              mode="outlined"
              editable={!isLoading}
              keyboardType="email-address"
              onChangeText={(text) => {
                if (showError) {
                  setShowError(false);
                }
                if (errors.email) {
                  clearErrors();
                }
                setEmail(text);
              }}
              error={!!errors.email}
              returnKeyType="next"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                handleRecoverPassword();
              }}
            />

            {showError && (
              <ContainerError>
                <Text style={{ color: theme.colors.error }}>
                  {errorMessage}
                </Text>
              </ContainerError>
            )}

            <Button
              mode="contained"
              style={{
                width: '100%',
                borderRadius: 8,
                marginVertical: 20,
                backgroundColor: theme.colors.primary,
              }}
              textColor={theme.colors.white}
              onPress={handleRecoverPassword}
              loading={isLoading}>
              RECEBER NOVO ACESSO
            </Button>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                }}>
                <Icon
                  name="arrow-back"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={{ color: theme.colors.primary, marginLeft: 10 }}>
                  Voltar para Login
                </Text>
              </TouchableOpacity>
            </View>
          </ContainerFields>
        </Card>
        <Snackbar
          visible={visible}
          duration={5000}
          onDismiss={onDismissSnackBar}
          style={{ backgroundColor: '#72e128' }}>
          Enviamos as instruções de acesso para o seu e-mail
        </Snackbar>
      </Container>
    </KeyboardAvoiding>
  );
};

export default RecoverPassword;
