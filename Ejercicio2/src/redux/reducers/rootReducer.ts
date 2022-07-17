import {combineReducers} from 'redux';
import modalReducer from './modalReducer';
import beerReducer from './beerReducer';

export const rootReducer = combineReducers({
  beer: beerReducer,
  modal: modalReducer,
});
