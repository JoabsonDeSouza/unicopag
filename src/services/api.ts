/* eslint-disable no-param-reassign */
import axios from 'axios';
import ENV from 'config/environmentVariables';
import { getToken } from 'datastore/configurations';

import parseResponseData from './parsers/ParsedResponse';
import parseResponseError from './parsers/ParsedResponseError';

const publicUrls = ['/api/auth/login', 'api/auth/refresh'];

const getCurrentToken = async (url: string) => {
  if (!url || publicUrls.includes(url)) {
    return '';
  }

  const token = await getToken();
  return `Bearer ${token}`;
};

/**
 * axios instance
 */
const api = axios.create({
  baseURL: ENV.API_URL,
});

// request header
api.interceptors.request.use(
  async (config: any) => {
    const token = await getCurrentToken(config.url);

    if (token) {
      config.headers.Authorization = token;
    }

    console.log('>>>>> interceptor: ', {
      url: config.url,
      params: config.data,
      token: config.headers.Authorization,
    });

    return config;
  },
  (e: any) => {
    return parseResponseError(e);
  }
);

// response parse
api.interceptors.response.use(
  (response: any) => {
    return parseResponseData(response);
  },
  (err: any) => {
    return parseResponseError(err);
  }
);

export default api;
