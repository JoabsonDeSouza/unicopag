import React from 'react';
import { Image } from 'react-native';
import logo from 'assets/logo.png';

const Logo = () => {
  return (
    <Image
      source={logo}
      style={{ width: 100, height: 50, resizeMode: 'contain' }}
    />
  );
};

export default Logo;
