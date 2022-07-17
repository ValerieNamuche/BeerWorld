import {Beer} from '../../config/entity/beerType';

export const BEER_LIST_LOADING = 'BEER_LIST_LOADING';
export const BEER_LIST_SUCCESS = 'BEER_LIST_SUCCESS';
export const BEER_LIST_FAIL = 'BEER_FAIL';

export const IS_LOADING = 'IS_LOADING';

export const BEER_LOADING = 'BEER_LOADING';
export const BEER_SUCCESS = 'BEER_SUCCESS';
export const BEER_FAIL = 'BEER_FAIL';

export const USER_LOADING = 'USER_LOADING';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAIL = 'USER_FAIL';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export interface BeerListLoading {
  type: typeof BEER_LIST_LOADING;
}

export interface BeerListFail {
  type: typeof BEER_LIST_FAIL;
}

export interface BeerListSuccess {
  type: typeof BEER_LIST_SUCCESS;
  payload: Beer[];
}

export interface BeerLoading {
  type: typeof BEER_LOADING;
}

export interface BeerFail {
  type: typeof BEER_FAIL;
}

export interface BeerSuccess {
  type: typeof BEER_SUCCESS;
  payload: Beer;
}

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserFail {
  type: typeof USER_FAIL;
}

export interface UserSuccess {
  type: typeof USER_SUCCESS;
  payload: String;
}

export interface showModal {
  type: typeof SHOW_MODAL;
}
export interface hideModal {
  type: typeof HIDE_MODAL;
}

export type BeerListDispatchTypes =
  | BeerListLoading
  | BeerListFail
  | BeerListSuccess;

export type BeerDispatchTypes = BeerLoading | BeerFail | BeerSuccess;

export type UserDispatchTypes = UserLoading | UserFail | UserSuccess;

export type ShowModalDispatchTypes = showModal | hideModal;
