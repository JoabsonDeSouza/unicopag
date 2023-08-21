import useGetBalance from 'queries/balance/useGetBalance';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { Text, Card, Avatar } from 'react-native-paper';
import useUserStore from 'store/user/useUserStore';

import { Container, ContainerValues, CardIcon } from './styles';
import { Image, StatusBar, View } from 'react-native';
import { Balance } from 'model/balance';
import Loading from 'components/Loading';
import { formatValueByCurrency } from 'utils/utils';
import useGetSalesByRange from 'queries/balance/useGetSalesByRange';
import logo from 'assets/logo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import useFetchRefreshToken from 'queries/auth/useFetchRefreshToken';
import { useJwtTokenStore } from 'store/settings';
import { useNavigation } from '@react-navigation/native';
import { AUTH } from 'routes/screenNames';
import { NavigationProps } from 'routes/types';
import MenuOptions from 'components/MenuOptions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImageLogo = (
  <Image
    source={logo}
    style={{ width: 200, height: 100, resizeMode: 'contain' }}
  />
);

const Dashboard = () => {
  const refreshTry = useRef<number>(0);
  const navigation = useNavigation<NavigationProps<''>>();

  const user = useUserStore((store) => store.user);
  const theme = useTheme();

  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [last7days, setLast7days] = useState<number>(0);
  const [balance, setBalance] = useState<Balance>({
    available: 0,
    transferred: 0,
    waiting_funds: 0,
  });

  const { mutateAsync: getBalance } = useGetBalance();
  const { mutateAsync: getSalesByRange } = useGetSalesByRange();
  const { mutateAsync: refreshToken } = useFetchRefreshToken();

  const { setJwtToken } = useJwtTokenStore((store) => store);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const callServices = useCallback(async () => {
    try {
      const salesByRange = await getSalesByRange();
      if (salesByRange?.current?.paid?.amount_total) {
        setLast7days(salesByRange?.current?.paid?.amount_total);
      }
      const result = await getBalance();
      setBalance(result);

      setTimeout(() => setLoading(false), 300);
    } catch (error: any) {
      if (
        refreshTry.current === 0 &&
        error.message === 'Unauthenticated.' &&
        error.status === 401
      ) {
        refreshTry.current = 1;
        const newToken = await refreshToken();
        setJwtToken(newToken);

        setTimeout(() => callServices(), 100);
      } else {
        if (refreshTry.current === 1) {
          logout();
        }
        setLoading(false);
      }
    }
  }, [balance]);

  const logout = () => {
    setJwtToken('');
    navigation.replace(AUTH);
  };

  useEffect(() => {
    callServices();
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.background} />
      {loading && <Loading />}

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {ImageLogo}

        <TouchableOpacity
          onPress={openMenu}
          style={{
            alignContent: 'flex-end',
            width: 50,
          }}>
          <Avatar.Image
            size={36}
            source={
              user.avatar ? { uri: user.avatar } : require('assets/logo.png')
            }
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          variant="titleLarge"
          style={{
            alignSelf: 'center',
            color: theme.colors.white,
          }}>{`Olá, ${
          user.name ? user.name.split(' ')[0] : 'Visitante'
        }`}</Text>
      </View>

      <Card
        style={{
          width: '100%',
          marginTop: 20,
          paddingVertical: 30,
          backgroundColor: theme.colors.background,
        }}>
        <ContainerValues>
          <CardIcon color="#72e12850">
            <Icon name="trending-up" size={30} color="#72e128" />
          </CardIcon>
          <View>
            <Text
              style={{
                color: theme.colors.secondary,
              }}>
              Últimos 7 dias
            </Text>
            <Text
              variant="headlineSmall"
              style={{ color: theme.colors.secondary }}>
              {formatValueByCurrency(last7days)}
            </Text>
          </View>
        </ContainerValues>

        <View
          style={{
            width: '87%',
            height: 0.5,
            alignSelf: 'center',
            backgroundColor: theme.colors.border,
            marginBottom: 30,
          }}
        />

        <ContainerValues>
          <CardIcon color="#72e12850">
            <Icon name="done-all" size={30} color="#72e128" />
          </CardIcon>
          <View>
            <Text variant="headlineSmall" style={{ color: '#72e128' }}>
              {formatValueByCurrency(balance.available)}
            </Text>
            <Text
              style={{
                color: theme.colors.border,
              }}>
              Disponível
            </Text>
          </View>
        </ContainerValues>

        <ContainerValues>
          <CardIcon color="#fdb52850">
            <Icon2 name="stairs-up" size={30} color="#fdb528" />
          </CardIcon>
          <View>
            <Text variant="headlineSmall" style={{ color: '#fdb528' }}>
              {formatValueByCurrency(balance.waiting_funds)}
            </Text>
            <Text
              style={{
                color: theme.colors.border,
              }}>
              Saldo à liberar
            </Text>
          </View>
        </ContainerValues>

        <ContainerValues>
          <CardIcon color="#26c6f950">
            <Icon name="compare-arrows" size={30} color="#26c6f9" />
          </CardIcon>
          <View>
            <Text variant="headlineSmall" style={{ color: '#26c6f9' }}>
              {formatValueByCurrency(balance.transferred)}
            </Text>
            <Text
              style={{
                color: theme.colors.border,
              }}>
              Saque total realizado
            </Text>
          </View>
        </ContainerValues>
      </Card>

      <MenuOptions
        visible={visible}
        closeMenu={closeMenu}
        handleExit={logout}
      />
    </Container>
  );
};

export default Dashboard;
