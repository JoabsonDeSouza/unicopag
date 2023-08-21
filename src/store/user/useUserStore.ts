import AsyncStorage from '@react-native-community/async-storage';
import { User } from 'model/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserType = User;

type State = {
  user: UserType;
  setUser: (user: UserType) => void;
};

const useUserStore = create(
  persist<State>(
    (set) => ({
      user: {} as UserType,
      setUser: (user: UserType) => {
        set(() => ({ user }));
      },
    }),
    {
      name: '@user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
