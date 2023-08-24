import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerActions, StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import logoIcon from 'assets/icon_unico.png';
import Button from 'components/Button';
import { User } from 'model/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { DrawerItemProps } from 'routes/Drawer/types';
import { AUTH } from 'routes/screenNames';
import { useJwtTokenStore, useAppVersion } from 'store/settings';
import useUserStore from 'store/user/useUserStore';
import drawerData from './drawer';

import Item from './components/Item';
import {
  Container,
  Header,
  ContainerUser,
  ContainerClose,
  UserPicture,
  CompaniesCard,
  UserName,
  CompanyList,
  ContainerCompanies,
  Text,
  CompanyItem,
  ContainerButton,
  CompanyName,
} from './styles';
import Logo from 'components/Logo';
import useStores from 'store/stores/useStores';
import { Store } from 'model/store';

interface Props extends DrawerContentComponentProps {}

const DrawerScreen = ({ navigation }: Props) => {
  const setUser = useUserStore((store) => store.setUser);
  const setToken = useJwtTokenStore((store) => store.setJwtToken);
  const appVersion = useAppVersion((store) => store.appVersion);
  const [expanded, setExpanded] = useState(false);

  const { stores, setStores, currentStore, setCurrentStore } = useStores(
    (store) => store
  );

  const handlePress = () => setExpanded(!expanded);

  const handlePressListItem = useCallback(
    (drawerItem: DrawerItemProps) => {
      // eslint-disable-next-line no-console
      console.log({ click: drawerItem.routeName });
      navigation.dispatch(DrawerActions.closeDrawer());

      setTimeout(() => {
        navigation.navigate(drawerItem.routeName);
      }, 220);
    },
    [navigation]
  );

  const { user } = useUserStore();
  const name = user?.name || 'UnicoPag';
  const image = user.avatar ? { uri: user.avatar } : logoIcon;

  const handlerDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleDisconnect = () => {
    setTimeout(() => {
      setUser({} as User);
      setToken('');
      navigation.dispatch(StackActions.replace(AUTH));
    }, 220);
  };

  const handleClickItem = (itemClicked: Store) => {
    setCurrentStore(itemClicked);
    const updateList: any = stores.map((item) => {
      return {
        ...item,
        checked: itemClicked.id === item.id,
      };
    });

    setStores(updateList);
    setExpanded(false);
    handlerDrawer();
  };

  return (
    <Container>
      <Header>
        <Logo />
        <ContainerClose
          onPress={handlerDrawer}
          hitSlop={{
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
          }}>
          <Icon name={'close'} size={30} color="white" />
        </ContainerClose>
      </Header>
      <ContainerUser>
        <UserPicture source={image} />
        <UserName numberOfLines={2}>
          Olá, {name ? name.split(' ')[0] : 'Visitante'}
        </UserName>
      </ContainerUser>

      <ContainerCompanies>
        <CompaniesCard>
          <CompanyItem onPress={handlePress}>
            <CompanyName>{currentStore?.title}</CompanyName>
            <Icon
              style={{ position: 'absolute', right: 0 }}
              name={'arrow-drop-down'}
              size={25}
              color="white"
            />
          </CompanyItem>
        </CompaniesCard>

        {expanded && (
          <CompanyList
            data={stores}
            style={{
              position: 'absolute',
              top: 45,
              width: '80%',
              backgroundColor: '#272A42',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 8,
              zIndex: 1000,
            }}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }: any) => (
              <CompanyItem onPress={() => handleClickItem(item)}>
                <CompanyName style={{ marginRight: 10 }} numberOfLines={1}>
                  {item.title.length > 20
                    ? `${item.title.substring(0, 20)}...`
                    : item.title}
                </CompanyName>

                {item.checked && (
                  <Icon name={'check'} size={25} color="white" />
                )}
              </CompanyItem>
            )}
          />
        )}
      </ContainerCompanies>

      <FlatList
        style={{
          flex: 1,
          zIndex: -1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={drawerData.menu}
        renderItem={({ item }) => (
          <Item
            data={item}
            onPress={() =>
              handlePressListItem({
                id: item.id,
                label: item.label,
                routeName: item.routeName,
              })
            }
          />
        )}
      />

      <ContainerButton>
        <Button
          width={80}
          height={40}
          iconRight={<Icon name={'exit-to-app'} size={20} color="white" />}
          onPress={handleDisconnect}
          backgroundOff
          loading={false}>
          Desconectar
        </Button>
      </ContainerButton>
      <Text>{appVersion}</Text>
    </Container>
  );
};

export default DrawerScreen;
