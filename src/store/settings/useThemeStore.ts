import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ThemeType = 'dark' | 'light';

type State = {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
};

const useThemeStore = create(
  persist<State>(
    (set) => ({
      theme: 'light',
      changeTheme: (theme) => {
        set(() => ({ theme }));
      },
    }),
    {
      name: '@theme',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useThemeStore;
