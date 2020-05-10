import * as types from '../constants/reduxFormConstants';

export const initAction = (data) => ({ type: types.INIT, data });
export const clearAction = { type: types.CLEAR };
