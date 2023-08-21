/* eslint-disable no-return-await */
import { useMutation } from '@tanstack/react-query';
import { ResponseLogin } from 'queries/auth/types';
import api from 'services/api';

export type DataToSignInEmail = {
  email: string;
  password: string;
  remember?: boolean;
};

const signInAsEmailService = async (
  params: DataToSignInEmail
): Promise<ResponseLogin> => {
  const { email, password, remember = false } = params;

  return await api.post('/api/auth/login', {
    email: String(email),
    password: String(password),
    remember,
  });
};

export default function useFetchSignInEmail() {
  return useMutation(signInAsEmailService);
}
