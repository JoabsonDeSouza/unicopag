/* eslint-disable no-return-await */
import { useMutation } from '@tanstack/react-query';
import { Store } from 'model/store';
import api from 'services/api';

const getCompanies = async (): Promise<Store[]> => {
  return await api.get('/api/stores');
};

export default function useGetStores() {
  return useMutation(getCompanies);
}
