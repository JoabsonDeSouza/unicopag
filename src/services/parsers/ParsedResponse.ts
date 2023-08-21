import { AxiosResponse } from 'axios';

import { RawResponse } from './RawResponse';

export default function parseResponseData<T>(
  response: AxiosResponse<RawResponse<T>> | AxiosResponse<T>
): T {
  if (
    typeof response.data === 'object' &&
    response.data &&
    'data' in response.data
  ) {
    return response.data.data;
  }

  return response.data;
}
