import { useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Menu from 'react-native-vector-icons/MaterialIcons';

import { Container, IconContainer } from './styles';
import Logo from 'components/Logo';

interface Props {
  hideMenu?: boolean;
}

const Header = ({ hideMenu }: Props) => {
  const navigation = useNavigation<any>();
  const drawerStatus = useDrawerStatus();

  const handlerDrawer = () => {
    if (drawerStatus === 'open') {
      navigation.closeDrawer();
      return;
    }
    navigation.openDrawer();
  };

  return (
    <Container>
      {!hideMenu && (
        <IconContainer onPress={handlerDrawer} activeOpacity={0.85}>
          <Menu name="menu" size={30} />
        </IconContainer>
      )}

      <Logo />
    </Container>
  );
};

export default Header;
