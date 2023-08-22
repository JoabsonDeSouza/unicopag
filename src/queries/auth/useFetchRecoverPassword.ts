/* eslint-disable no-return-await */
import { useMutation } from '@tanstack/react-query';
import { ResponseLogin } from 'queries/auth/types';
import api from 'services/api';

export type Props = {
  email: string;
};

const recoverPasswordService = async (
  params: Props
): Promise<ResponseLogin> => {
  const { email } = params;

  return await api.post('api/auth/recovery', {
    email: String(email),
  });
};

export default function useFetchRecoverPassword() {
  return useMutation(recoverPasswordService);
}
