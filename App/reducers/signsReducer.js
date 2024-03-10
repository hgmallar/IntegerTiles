import {ADD_SIGN} from '../constants';
import {REMOVE_SIGN} from '../constants';
const initialState = ['\u002b'];

const signsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SIGN:
      return [...state, action.payload];
    case REMOVE_SIGN:
      return state.filter((sign) => sign !== action.payload);
    default:
      return state;
  }
};
export default signsReducer;
