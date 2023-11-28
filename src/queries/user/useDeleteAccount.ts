/* eslint-disable no-return-await */
import { useMutation } from '@tanstack/react-query';
import api from 'services/api';

const deleteAccount = async (): Promise<any> => {
  return await api.delete('/api/accounts');
};

export default function useDeleteAccount() {
  return useMutation(deleteAccount);
}
