/* eslint-disable no-return-await */
import { useMutation } from '@tanstack/react-query';
import { SalesByRange } from 'model/salesByRange';
import api from 'services/api';

export type DataToGetTransactions = {
  idStore: string;
};

const getGetTransactionsByRange = async (
  dataParams: DataToGetTransactions
): Promise<SalesByRange> => {
  const dateMinor7Days = new Date();
  dateMinor7Days.setDate(dateMinor7Days.getDate() - 7);

  const year = dateMinor7Days.getFullYear();
  const month = String(dateMinor7Days.getMonth() + 1).padStart(2, '0');
  const day = String(dateMinor7Days.getDate()).padStart(2, '0');

  const startDate = `${year}-${month}-${day}`;

  const currentData = new Date();
  const year1 = currentData.getFullYear();
  const month1 = String(currentData.getMonth() + 1).padStart(2, '0');
  const day1 = String(currentData.getDate()).padStart(2, '0');

  const endDate = `${year1}-${month1}-${day1}`;

  const params = {
    'dateInterval[start]': startDate,
    'dateInterval[end]': endDate,
    'dateInterval[range][0]': startDate,
    'dateInterval[range][1]': endDate,
    page: 1,
  };

  const config = {
    headers: {
      Store: dataParams.idStore,
    },
  };

  return await api.get(`/api/transactions`, { params: params, ...config });
};

export default function useGetTransactionsByRange() {
  return useMutation(getGetTransactionsByRange);
}
