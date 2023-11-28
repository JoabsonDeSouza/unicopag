import React, { useState } from 'react';

import { Container, ContainerItems } from './styles';
import {
  Text,
  Avatar,
  TextInput,
  Button,
  Snackbar,
  Modal,
  Portal,
} from 'react-native-paper';
import { useUserStore } from 'store/user';
import logoIcon from 'assets/icon_unico.png';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useDeleteAccount from 'queries/user/useDeleteAccount';
import Loading from 'components/Loading';
import { AUTH } from 'routes/screenNames';
import { useJwtTokenStore } from 'store/settings';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'routes/types';

const Profile: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>(
    'Conta deletada com sucesso... até a próxima!'
  );

  const navigation = useNavigation<NavigationProps<''>>();

  const { user } = useUserStore();

  const name = user?.name || 'UnicoPag';
  const image = user.avatar ? { uri: user.avatar } : logoIcon;

  const { setJwtToken } = useJwtTokenStore((store) => store);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { mutateAsync: deleteAccount, isLoading } = useDeleteAccount();

  const handleDeleteAccount = async () => {
    await deleteAccount()
      .then(() => {
        setVisible(false);
        setShowSnack(true);

        setTimeout(() => {
          setJwtToken('');
          navigation.replace(AUTH);
        }, 800);
      })
      .catch((e) => {
        setSnackMessage('Ops, ocorreu um erro... favor tente mais tarde!');

        setTimeout(() => {
          setShowSnack(true);
        }, 800);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Avatar.Image
            source={image}
            size={100}
            style={{ alignSelf: 'center' }}
          />
          <Text
            style={{ marginTop: 30, marginBottom: 25, alignSelf: 'center' }}
            variant="headlineMedium">
            Meu Perfil
          </Text>
          <ContainerItems>
            <Text variant="titleMedium">Nome</Text>
            <TextInput
              label={name}
              placeholder="Nome"
              style={{ width: '100%', marginBottom: 20 }}
              mode="outlined"
              disabled
              outlineColor="white"
              outlineStyle={{
                borderColor: 'gray',
              }}
              textColor="white"
            />

            <Text variant="titleMedium">Email</Text>
            <TextInput
              label={user.email}
              placeholder="Email"
              style={{ width: '100%' }}
              mode="outlined"
              disabled
              outlineColor="white"
              outlineStyle={{
                borderColor: 'gray',
              }}
              textColor="white"
            />

            <Button style={{ marginTop: '10%' }} onPress={showModal}>
              Deletar Conta?
            </Button>
          </ContainerItems>

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: 'white',
                width: '90%',
                minHeight: '30%',
                alignSelf: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}>
              <Icon name="warning" size={60} color="red" />
              <Text
                style={{ color: 'black', marginTop: 10, fontWeight: '700' }}
                lineBreakMode="head">
                Confirmar Exclusão de Conta
              </Text>
              <Text style={{ color: 'black', marginTop: 10 }}>
                Você está prestes a excluir sua conta. Por favor, leia
                atentamente as seguintes informações antes de prosseguir:
              </Text>

              <Text
                style={{ color: 'black', marginTop: 10, fontWeight: 'bold' }}>
                A exclusão de conta é uma ação irreversível. Uma vez confirmada,
                não será possível recuperar sua conta ou informações associadas.
              </Text>

              <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                <Button
                  style={{ marginRight: 10 }}
                  textColor="white"
                  buttonColor="red"
                  onPress={hideModal}
                  mode="contained">
                  Cancelar
                </Button>

                <Button
                  style={{ marginLeft: 10 }}
                  onPress={handleDeleteAccount}
                  textColor="white"
                  buttonColor="blue"
                  mode="contained">
                  Deletar!
                </Button>
              </View>
            </Modal>
          </Portal>

          <Snackbar visible={showSnack} onDismiss={() => {}}>
            {snackMessage}
          </Snackbar>
        </Container>
      )}
    </>
  );
};

export default Profile;
