import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getConstant } from '@/global/constants';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  timeout: getConstant('apiTimeout') as number,
  prepareHeaders: async (headers) => {
    const token = '';
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    if (timezone) {
      headers.set('Timezone', timezone);
    }
    return headers;
  }
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({})
});
