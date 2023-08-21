import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-community/async-storage';
export const KEY_REMEMBER_LOGIN = '@remember_login';

type State = {
  rememberLogin: string;
  setRememberLogin: (value: string) => void;
};

const useRememberLogin = create(
  persist<State>(
    (set) => ({
      rememberLogin: '',
      setRememberLogin: (rememberLogin) => {
        set(() => ({ rememberLogin }));
      },
    }),
    {
      name: KEY_REMEMBER_LOGIN,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useRememberLogin;
