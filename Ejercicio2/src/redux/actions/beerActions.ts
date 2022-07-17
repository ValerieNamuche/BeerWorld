import {
  BEER_LIST_LOADING,
  BEER_LIST_SUCCESS,
  BEER_LIST_FAIL,
  BEER_LOADING,
  BEER_SUCCESS,
  BEER_FAIL,
  BeerListDispatchTypes,
  BeerDispatchTypes,
  USER_LOADING,
  USER_FAIL,
  USER_SUCCESS,
  UserDispatchTypes
} from '../types';
import {Beer} from '../../config/entity/beerType';
import BeerService from '../../config/services/beerServices';
import {Dispatch} from 'redux';

export const getBeerListAction =
  (pagination: number) => async (dispatch: Dispatch<BeerListDispatchTypes>) => {
    try {
      dispatch({
        type: BEER_LIST_LOADING,
      });
      const res: Beer[] = await BeerService.getBeerList(pagination);

      dispatch({
        type: BEER_LIST_SUCCESS,
        payload: res,
      });
    } catch (e) {
      dispatch({
        type: BEER_LIST_FAIL,
      });
    }
  };

export const getBeerDetails =
  (id: string) => async (dispatch: Dispatch<BeerDispatchTypes>) => {
    try {
      dispatch({
        type: BEER_LOADING,
      });
      const res = await BeerService.getBeerDetails(id);

      dispatch({
        type: BEER_SUCCESS,
        payload: res,
      });
    } catch (e) {
      dispatch({
        type: BEER_FAIL,
      });
    }
  };
