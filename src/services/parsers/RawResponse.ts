import { AxiosError } from 'axios';

type RawError = {
  error: {
    code: number;
    message: string;
  };
};

export type RequestError = AxiosError<RawError>;

type DefaultResponse<Data> = {
  data: Data;
};

export type RawResponse<Data> = DefaultResponse<Data>;
