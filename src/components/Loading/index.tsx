import { View, StyleSheet, Dimensions } from 'react-native';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={MD2Colors.white} size={50} />
    </View>
  );
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width,
    height,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#30334E',
  },
});

export default Loading;
