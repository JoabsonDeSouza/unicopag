import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import { useTheme } from 'styled-components';

interface MenuOptionsProps {
  visible: boolean;
  closeMenu: () => void;
  handleExit: () => void;
}

const MenuOptions = ({ visible, closeMenu, handleExit }: MenuOptionsProps) => {
  const theme = useTheme();

  const containerStyle = {
    backgroundColor: theme.colors.background,
    padding: 20,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closeMenu}
        style={{ alignItems: 'center' }}
        contentContainerStyle={containerStyle}>
        <View style={{ width: 300 }}>
          <Button
            icon={'exit-to-app'}
            mode="contained"
            style={{
              width: '100%',
              borderRadius: 8,
              marginVertical: 20,
              backgroundColor: theme.colors.primary,
            }}
            textColor={theme.colors.white}
            onPress={handleExit}>
            Deslogar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default MenuOptions;
