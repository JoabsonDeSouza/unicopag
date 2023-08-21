import AsyncStorage from '@react-native-community/async-storage';
import { KEY_DATA_TOKEN } from 'store/settings/useJwtTokenStore';
import { KEY_REMEMBER_LOGIN } from 'store/settings/useRememberLogin';

export const saveMessageToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    console.warn('>>> ERR saveMessageToken', e);
  }
};

export const getToken = async (): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(KEY_DATA_TOKEN);
    const parseValue = value ? JSON.parse(value).state.jwtToken : '';
    return parseValue;
  } catch (e) {
    console.warn('>>> ERR getToken', e);
    return '';
  }
};

export const getRememberLogin = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(KEY_REMEMBER_LOGIN);
    const parseValue = value ? JSON.parse(value) : '';
    return !!parseValue;
  } catch (e) {
    console.warn('>>> ERR getRememberLogin', e);
    return false;
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.warn(e);
  }
};
