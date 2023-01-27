/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react18-router';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import history from '../utils/history';
import login from './modules/login';
import uiReducer from './modules/ui';
import initval from './modules/initForm';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    login,
    ui: uiReducer,
    initval,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
