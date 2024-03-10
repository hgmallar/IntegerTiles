import {ADD_SIGN} from '../constants';
import {REMOVE_SIGN} from '../constants';

export function addSigns(sign) {
  return {
    type: ADD_SIGN,
    payload: sign,
  }
}

export function deleteSigns(sign) {
  return {
    type: REMOVE_SIGN,
    payload: sign,
  }
}
