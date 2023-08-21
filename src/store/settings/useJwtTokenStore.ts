import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-community/async-storage';
export const KEY_DATA_TOKEN = '@jwt_token';

type State = {
  jwtToken: string;
  setJwtToken: (value: string) => void;
};

const useJwtTokenStore = create(
  persist<State>(
    (set) => ({
      jwtToken: '',
      setJwtToken: (jwtToken) => {
        set(() => ({ jwtToken }));
      },
    }),
    {
      name: KEY_DATA_TOKEN,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useJwtTokenStore;
