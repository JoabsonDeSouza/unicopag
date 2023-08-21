/* eslint-disable no-return-await */
import { useMutation } from '@tanstack/react-query';
import { Balance } from 'model/balance';
import api from 'services/api';

const getBalance = async (): Promise<Balance> => {
  return await api.get('/api/accounts/balance');
};

export default function useGetBalance() {
  return useMutation(getBalance);
}
