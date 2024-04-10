/**
 * Create the store with dynamic reducers
 */

import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE,
  PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const listenerMiddleware = createListenerMiddleware();

const persistConfig = {
  key: 'dandelion',
  storage,
  whitelist: ['ui']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

export default store;
