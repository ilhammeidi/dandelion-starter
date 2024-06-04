/*
 *
 * LanguageProvider reducer
 *
 */

/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit'

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLocale: (state, action) => {
      state.locale = action.payload
    }
  }
});

export const { changeLocale } = languageProviderSlice.actions;

export default languageProviderSlice.reducer;
