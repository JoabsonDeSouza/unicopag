import { create } from 'zustand';

type State = {
  appVersion: string;
  changeAppVersion: (value: string) => void;
};

const useAppVersion = create<State>((set) => ({
  appVersion: '',
  changeAppVersion: (appVersion) => {
    set(() => ({ appVersion }));
  },
}));

export default useAppVersion;
