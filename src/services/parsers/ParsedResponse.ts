import { AxiosResponse } from 'axios';

export default function parseResponseData<T>(response: AxiosResponse<T>): T {
  return response.data;
}
