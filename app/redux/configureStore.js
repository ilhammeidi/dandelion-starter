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

//  export default function configStore() {
//    const store = configureStore({
//      // Automatically calls `combineReducers`
//      reducer: {
//        persistedReducer,
//      },
//      middleware: (getDefaultMiddleware) =>
//        getDefaultMiddleware({
//          serializableCheck: {
//            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//          },
//        })
//    });
//
//    const persistor = persistStore(store);
//
//    return { store, persistor };
//  }

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

//  export default function configureStore(initialState = {}) { // eslint-disable-line
//    // Create the store with two middlewares
//    // 1. sagaMiddleware: Makes redux-sagas work
//    // 2. routerMiddleware: Syncs the location/URL path to the state
//    const middlewares = [sagaMiddleware];
//
//    const enhancers = [applyMiddleware(...middlewares)];
//    const composeEnhancers = process.env.NODE_ENV !== 'production'
//      && typeof window === 'object'
//      && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//        // Prevent recomputing reducers for `replaceReducer`
//        shouldHotReload: false,
//      })
//      : compose;
//    /* eslint-enable */
//
//    const store = createStore(
//      persistedReducer,
//      initialState,
//      composeEnhancers(...enhancers),
//    );
//
//    const persistor = persistStore(store);
//    // Extensions
//    store.runSaga = sagaMiddleware.run;
//    store.injectedReducers = {}; // Reducer registry
//    store.injectedSagas = {}; // Saga registry
//
//    // Make reducers hot reloadable, see http://mxs.is/googmo
//    /* istanbul ignore next */
//    if (module.hot) {
//      module.hot.accept('./reducers', () => {
//        store.replaceReducer(createReducer(store.injectedReducers));
//      });
//    }
//
//    return { store, persistor };
//  }
