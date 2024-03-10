import {createStore, combineReducers} from 'redux';
import signsReducer from '../reducers/signsReducer';
import equationReducer from '../reducers/equationReducer';
import inputsReducer from '../reducers/inputsReducer';
const rootReducer = combineReducers({
  signs: signsReducer,
  equation: equationReducer,
  inputs: inputsReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
