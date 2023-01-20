/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react18-router';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'dandelion',
  storage,
  whitelist: ['ui']
};

const persistedReducer = persistReducer(persistConfig, createReducer());

export default function configureStore(initialState = {}, history) { // eslint-disable-line
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];
  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Prevent recomputing reducers for `replaceReducer`
      shouldHotReload: false,
    })
    : compose;
  /* eslint-enable */

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  const persistor = persistStore(store);
  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return { store, persistor };
}
