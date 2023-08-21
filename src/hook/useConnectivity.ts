import { addEventListener, useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export default function useConnectivity() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  const { isInternetReachable, isConnected: connected } = useNetInfo();
  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      setIsConnected(state.isInternetReachable && state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return isConnected || isInternetReachable || connected;
}
