import {NEW_EQUATION} from '../constants';
const initialState = {
  firstNum: '0',
  secondNum: '0',
  thirdNum: '0',
  position: 2,
  sign: '\u002b',
};
const equationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_EQUATION:
      return {
        ...state,
        firstNum: action.payload.firstNum,
        secondNum: action.payload.secondNum,
        thirdNum: action.payload.thirdNum,
        position: action.payload.position,
        sign: action.payload.sign,
      };
    default:
      return state;
  }
};
export default equationReducer;
