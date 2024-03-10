import {
  RESET_SCORE,
  SUBMIT_INPUT,
  UPDATE_TEXT,
  RESET_EQUATION,
} from '../constants';
const initialState = {
  numInput: '',
  score: 0,
  nextVisible: false,
  inputDisabled: false,
  correct: false,
};
const inputsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEXT:
      return {
        ...state,
        numInput: action.payload,
      };
    case SUBMIT_INPUT:
      return {
        ...state,
        nextVisible: action.payload.nextVisible,
        correct: action.payload.correct,
        score: action.payload.score,
        inputDisabled: action.payload.inputDisabled,
      };
    case RESET_EQUATION:
      return {
        ...state,
        nextVisible: action.payload.nextVisible,
        inputDisabled: action.payload.inputDisabled,
        numInput: action.payload.numInput,
      };
    case RESET_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};
export default inputsReducer;
