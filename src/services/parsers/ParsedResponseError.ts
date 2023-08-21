import { AxiosError, AxiosResponse } from 'axios';

interface Error extends AxiosResponse {
  data: {
    message: string;
    status: number;
    data: {
      message: string;
    };
    error: {
      status: number;
      name: string;
      message: string;
      details: any;
    };
  };
}
interface RequestErrorResponse extends AxiosError {
  response: Error;
}

export interface ResponseErrorApi {
  message: string;
  status: number;
}

export default async function parseResponseError<T>(
  error: RequestErrorResponse
): Promise<Awaited<T>> {
  console.log('>>>>>>> ParseResponseError', JSON.stringify(error.response));

  const responseError: ResponseErrorApi = {
    message: error.response.data.message,
    status: error.response.status,
  };
  throw responseError;
}
