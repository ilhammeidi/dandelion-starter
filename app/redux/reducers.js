/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineSlices } from '@reduxjs/toolkit';

import language from 'containers/LanguageProvider/reducer';
// import login from './modules/login';
import uiReducer from './modules/ui';
// import initval from './modules/initForm';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineSlices({
  // login,
  ui: uiReducer,
  // initval,
  language
});
