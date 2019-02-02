import { fromJS, Map } from 'immutable';
import { INIT, CLEAR } from '../../actions/actionConstants';

const initialState = {
  formValues: Map()
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state.withMutations((mutableState) => {
        mutableState.set('formValues', action.data);
      });
    case CLEAR:
      return state.withMutations((mutableState) => {
        mutableState.set('formValues', []);
      });
    default:
      return state;
  }
}
