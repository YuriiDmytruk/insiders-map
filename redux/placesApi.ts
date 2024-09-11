import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_KEY = 'AIzaSyDo2zSU4FTTxh9LahbYjedkIDBGd5t122c';

export const placesApi = createApi({
  reducerPath: 'placesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://maps.googleapis.com/maps/api/' }),
  endpoints: (builder) => ({
    fetchNearbyPlaces: builder.query<any, { latitude: number, longitude: number, radius: number, type: string }>({
      query: ({ latitude, longitude, radius, type }) =>
        `place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${API_KEY}`,
    }),
  }),
});

export const { useFetchNearbyPlacesQuery } = placesApi;
