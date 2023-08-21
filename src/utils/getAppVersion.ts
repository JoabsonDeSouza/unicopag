import DeviceInfo from 'react-native-device-info';

export const getAppVersion = async () => {
  const versionApp = DeviceInfo.getVersion();

  try {
    return `Versão: ${versionApp}`;
  } catch (error) {
    return `Versão: XXXX`;
  }
};
