import useGetBalance from 'queries/balance/useGetBalance';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { Text, Card } from 'react-native-paper';

import { Container, ContainerValues, CardIcon } from './styles';
import { StatusBar, View } from 'react-native';
import { Balance } from 'model/balance';
import Loading from 'components/Loading';
import { formatValueByCurrency } from 'utils/utils';
import useGetTransactionsByRange from 'queries/balance/useGetSalesByRange';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import useFetchRefreshToken from 'queries/auth/useFetchRefreshToken';
import { useJwtTokenStore } from 'store/settings';
import { useNavigation } from '@react-navigation/native';
import { AUTH } from 'routes/screenNames';
import { NavigationProps } from 'routes/types';
import Header from 'components/Header';
import useStores from 'store/stores/useStores';
import useGetStores from 'queries/stores/useGetStores';
import { Store } from 'model/store';

const Dashboard = () => {
  const refreshTry = useRef<number>(0);
  const navigation = useNavigation<NavigationProps<''>>();

  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(true);
  const [last7days, setLast7days] = useState<number>(0);
  const [balance, setBalance] = useState<Balance>({
    available: 0,
    transferred: 0,
    waiting_funds: 0,
  });

  const { mutateAsync: getBalance } = useGetBalance();
  const { mutateAsync: getTransactionsByRange } = useGetTransactionsByRange();
  const { mutateAsync: refreshToken } = useFetchRefreshToken();
  const { mutateAsync: getStores } = useGetStores();

  const { setJwtToken } = useJwtTokenStore((store) => store);
  const { setStores, setCurrentStore, currentStore } = useStores(
    (store) => store
  );

  const callServices = useCallback(async () => {
    try {
      const result = await getBalance();
      setBalance(result);

      const salesByRange = await getTransactionsByRange({
        idStore: `${currentStore?.id || ''}`,
      });

      if (salesByRange?.chart?.current?.paid?.amount_total) {
        setLast7days(salesByRange?.chart?.current?.paid?.amount_total);
      }

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

  const callStores = async () => {
    const stores = await getStores();
    setStores(stores);
    const store: Store = { ...stores[0], checked: true };
    setCurrentStore(store);
  };

  useEffect(() => {
    callStores();
  }, []);

  useEffect(() => {
    if (currentStore) {
      setLoading(true);
      callServices();
    }
  }, [currentStore]);

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.background} />
      {loading && <Loading />}

      <Header />

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
    </Container>
  );
};

export default Dashboard;
