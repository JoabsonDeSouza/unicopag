import { Store } from 'model/store';
import { create } from 'zustand';

type State = {
  stores: Store[];
  setStores: (value: Store[]) => void;
  currentStore?: Store;
  setCurrentStore: (value: Store) => void;
};

const useStores = create<State>((set) => ({
  stores: [],
  setStores: (stores) => {
    set(() => ({ stores }));
  },
  currentStore: undefined,
  setCurrentStore: (currentStore) => {
    set(() => ({ currentStore }));
  },
}));

export default useStores;
