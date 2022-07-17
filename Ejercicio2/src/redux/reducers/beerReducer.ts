import {
  BEER_LIST_LOADING,
  BEER_LIST_SUCCESS,
  BEER_LIST_FAIL,
  BEER_LOADING,
  BEER_SUCCESS,
  BEER_FAIL,
  FORWARD_LOADING,
  FORWARD_SUCCESS,
  FORWARD_FAIL,
  BeerListDispatchTypes,
  BeerDispatchTypes,
  ForwardDispatchTypes,
} from '../types';
import {Beer} from '../../config/entity/beerType';

interface IinitialState {
  beer: Beer[];
  details: any;
  loading: boolean;
  error: boolean;
}

const initialState: IinitialState = {
  beer: [],
  details: {},
  loading: false,
  error: false,
};
const beerReducer = (
  state: IinitialState = initialState,
  action: BeerListDispatchTypes | BeerDispatchTypes | ForwardDispatchTypes,
): IinitialState => {
  switch (action.type) {
    case BEER_LIST_FAIL:
      return {...state, loading: false, error: true};
    case BEER_LIST_LOADING:
      return {...state, loading: true};
    case BEER_LIST_SUCCESS:
      return {...state, loading: false, beer: action.payload, error: false};
    case BEER_FAIL:
      return {...state, loading: false, error: true};
    case BEER_LOADING:
      return {...state, loading: true};
    case BEER_SUCCESS:
      return {...state, loading: false, details: action.payload};
    case FORWARD_FAIL:
      return {...state, loading: false, error: true};
    case FORWARD_LOADING:
      return {...state, loading: true};
    case FORWARD_SUCCESS:
      return {
        ...state,
        loading: false,
        beer: state.beer.map(item =>
          item.id === action.payload.id ? {...item, isForwarded: true} : item,
        ),
        details: {...state.details, isForwarded: true},
        error: false,
      };
    default:
      return state;
  }
};

export default beerReducer;
