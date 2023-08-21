import { AppReactProps } from 'contexts/types';

import { AppContextProvider } from './app';

const ContextsProvider = ({ children }: AppReactProps) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};

export { ContextsProvider };
