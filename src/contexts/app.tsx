import WithoutConnection from 'components/WithoutConnection';
import { AppReactProps } from 'contexts/types';
import useOnesignal from 'hook/useOnesignal';
import { createContext, useCallback, useContext, useState } from 'react';

interface AppContextData {
  showWithoutConnect: (value: boolean) => void;
}

const AppContext = createContext({} as AppContextData);

const AppContextProvider = ({ children }: AppReactProps) => {
  useOnesignal.hook();

  const [showWithOutConnection, setShowWithOutConnection] =
    useState<boolean>(false);

  const showWithoutConnect = useCallback((value: boolean) => {
    setShowWithOutConnection(value);
  }, []);

  return (
    <AppContext.Provider
      value={{
        showWithoutConnect,
      }}>
      {children}
      {showWithOutConnection && <WithoutConnection />}
    </AppContext.Provider>
  );
};

function useApp(): AppContextData {
  const context = useContext(AppContext);

  return context;
}

export { AppContextProvider, useApp };
