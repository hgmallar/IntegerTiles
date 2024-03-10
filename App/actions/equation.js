import {NEW_EQUATION} from '../constants';
export function newEquation(firstNum, secondNum, thirdNum, position, sign) {
  return {
    type: NEW_EQUATION,
    payload: {firstNum, secondNum, thirdNum, position, sign},
  };
}
