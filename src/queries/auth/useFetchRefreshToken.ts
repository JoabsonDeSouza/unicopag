/* eslint-disable no-return-await */
import { useMutation } from '@tanstack/react-query';
import { getToken } from 'datastore/configurations';
import api from 'services/api';

export type DataToRefreshToken = {
  refreshToken: string;
};

const refreshTokenService = async (): Promise<any> => {
  const token = await getToken();

  return await api.post('/api/auth/refresh', {
    refreshToken: token,
  });
};

export default function useFetchRefreshToken() {
  return useMutation(refreshTokenService);
}
