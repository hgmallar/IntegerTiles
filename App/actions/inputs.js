import {UPDATE_TEXT} from '../constants';
import {SUBMIT_INPUT} from '../constants';
import {RESET_EQUATION} from '../constants';
import {RESET_SCORE} from '../constants';

export function updateText(text) {
  return {
    type: UPDATE_TEXT,
    payload: text,
  };
}
export function submitInput(nextVisible, correct, score, inputDisabled) {
  return {
    type: SUBMIT_INPUT,
    payload: {nextVisible, correct, score, inputDisabled},
  };
}
export function resetEquation(nextVisible, inputDisabled, numInput) {
  return {
    type: RESET_EQUATION,
    payload: {nextVisible, inputDisabled, numInput},
  };
}

export function resetScore(score) {
  return {
    type: RESET_SCORE,
    payload: score,
  };
}
