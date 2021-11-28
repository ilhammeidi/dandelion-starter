import produce from 'immer';
import { INIT, CLEAR } from '../constants/reduxFormConstants';

const initialState = {
  formValues: {}
};

/* eslint-disable default-case, no-param-reassign */
const initFormReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft.formValues = action.data;
      break;
    case CLEAR:
      draft.formValues = {};
      break;
    default:
      break;
  }
});

export default initFormReducer;
