import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './slices/mapSlice';
import { placesApi } from './placesApi';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    [placesApi.reducerPath]: placesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(placesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
