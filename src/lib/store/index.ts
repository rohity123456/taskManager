import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseAPI';

const initialState = {
  tasks: []
};

const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer
});

const reducerProxy = (state: any, action: any) => {
  if (action.type === 'logout') {
    return appReducer(initialState as any, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
