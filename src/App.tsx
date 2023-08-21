import 'react-native-gesture-handler';
import 'react-native-reanimated';

import RootContainer from './RootContainer';
import { PaperProvider } from 'react-native-paper';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { asyncStoragePersister, queryClient } from './config/queryConfig';

const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}>
      <PaperProvider>
        <RootContainer />
      </PaperProvider>
    </PersistQueryClientProvider>
  );
};

export default App;
