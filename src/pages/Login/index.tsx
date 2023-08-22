import { useNavigation } from '@react-navigation/native';
import logo from 'assets/logo.png';
import KeyboardAvoiding from 'components/KeyboardAvoiding';
import { useApp } from 'contexts/app';
import useConnectivity from 'hook/useConnectivity';
import useFetchSignInEmail from 'queries/auth/useFetchSignInEmail';
import { useCallback, useRef, useState } from 'react';
import { Keyboard, TouchableOpacity, View, Linking, Image } from 'react-native';
import { MAIN, RECOVER_PASSWORD, CREATE_ACCOUNT } from 'routes/screenNames';
import { NavigationProps } from 'routes/types';
import { useJwtTokenStore } from 'store/settings';
import useUserStore from 'store/user/useUserStore';
import { validateEmail } from 'utils/validations';
import { TextInput, Text, Button, Card, Checkbox } from 'react-native-paper';
import { useTheme } from 'styled-components';

import {
  Container,
  ContainerLogo,
  ContainerFields,
  ContainerCheckBox,
  ContainerError,
} from './styles';
import { ResponseLogin } from 'queries/auth/types';
import useRememberLogin from 'store/settings/useRememberLogin';

const emptyField = 'Este campo é obrigatório';
const emailWrong = 'Digite um e-mail valido';

const ImageLogo = (
  <Image
    source={logo}
    style={{ width: 200, height: 100, resizeMode: 'contain' }}
  />
);

const Login = () => {
  const isConnected = useConnectivity();
  const theme = useTheme();

  const { showWithoutConnect } = useApp();

  const { setUser } = useUserStore();
  const { mutateAsync, isLoading } = useFetchSignInEmail();
  const { setJwtToken } = useJwtTokenStore((store) => store);
  const { setRememberLogin } = useRememberLogin((store) => store);

  const [checked, setChecked] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps<''>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const passwordRef = useRef<any>();
  const checkedRef = useRef<boolean>(false);

  const onError = (error: any) => {
    setErrorMessage(error.message);
    setShowError(true);
  };

  const onSuccess = useCallback(
    async (response: ResponseLogin) => {
      setUser({ ...response.userData });
      setJwtToken(response.accessToken);
      if (checkedRef.current) {
        console.log('>>>checked');
        setRememberLogin(`remember`);
      }
      navigation.replace(MAIN);
    },
    [email, navigation, setJwtToken, setUser]
  );

  const handleNavigateLogin = useCallback(async () => {
    if (!isConnected) {
      showWithoutConnect(true);
      return;
    }

    if (!email || !validateEmail(email)) {
      setErrors({
        email: emailWrong,
        password: errors.password,
      });
      return;
    }

    if (!password) {
      setErrors({
        email: errors.email,
        password: emptyField,
      });
      return;
    }

    await mutateAsync(
      { email, password, remember: checkedRef.current },
      { onError, onSuccess }
    );
  }, [
    isConnected,
    email,
    password,
    mutateAsync,
    onSuccess,
    showWithoutConnect,
    errors.password,
    errors.email,
  ]);

  const clearErrors = useCallback(() => {
    setErrors({
      email: '',
      password: '',
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
            variant="headlineMedium">
            Seja bem vindo(a) à Único Checkout!
          </Text>

          <Text
            style={{
              color: theme.colors.border,
            }}>
            Faça login ou abra sua conta.
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
                passwordRef.current.focus();
              }}
            />
            <TextInput
              ref={passwordRef}
              label="Password"
              outlineStyle={{
                borderColor: !!errors.password
                  ? theme.colors.error
                  : theme.colors.border,
              }}
              style={{
                width: '100%',
                marginBottom: 15,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.secondary,
              }}
              textColor={theme.colors.secondary}
              value={password}
              editable={!isLoading}
              mode="outlined"
              activeOutlineColor={theme.colors.secondary}
              secureTextEntry={showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              }
              onChangeText={(text) => {
                if (showError) {
                  setShowError(false);
                }
                if (errors.password) {
                  clearErrors();
                }
                setPassword(text);
              }}
              error={!!errors.password}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                handleNavigateLogin();
              }}
            />

            <ContainerCheckBox>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    checkedRef.current = !checked;
                    setChecked(!checked);
                  }}
                />

                <Text style={{ marginLeft: 10, color: theme.colors.border }}>
                  Remember me
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(RECOVER_PASSWORD)}
                style={{
                  justifyContent: 'flex-end',
                }}>
                <Text style={{ color: theme.colors.primary }}>
                  Recuperar senha
                </Text>
              </TouchableOpacity>
            </ContainerCheckBox>

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
              onPress={handleNavigateLogin}
              loading={isLoading}>
              LOGIN
            </Button>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 10, color: theme.colors.secondary }}>
                Novo por aqui?
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate(CREATE_ACCOUNT)}
                style={{
                  justifyContent: 'flex-end',
                  marginLeft: 15,
                }}>
                <Text style={{ color: theme.colors.primary }}>Abrir conta</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: 'center',
                marginTop: 50,
              }}>
              <View style={{ marginBottom: 10, alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://unicodrop.com.br/termosepolitica.asp'
                    )
                  }
                  style={{
                    justifyContent: 'flex-end',
                    marginLeft: 15,
                  }}>
                  <Text style={{ color: theme.colors.primary }}>
                    Politicas de privacidade
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://unicodrop.com.br/termosepolitica.asp'
                    )
                  }
                  style={{
                    justifyContent: 'flex-end',
                    marginLeft: 15,
                  }}>
                  <Text style={{ color: theme.colors.primary }}>
                    Termos de uso
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ContainerFields>
        </Card>
      </Container>
    </KeyboardAvoiding>
  );
};

export default Login;
