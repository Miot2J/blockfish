import { put } from '@redux-saga/core/effects';
import axios from 'axios';
import { isEmpty } from '../../utils/utils';

export const GET_LIST = 'GET_LIST';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'GET_LIST_ERROR';
export const SET_LIST = 'SET_LIST';
export const RESET_LIST = 'RESET_LIST';

// 액션 함수 정의
export const getListStart = () => ({
  type: GET_LIST,
});
export const getListSuccess = (data) => ({
  type: GET_LIST_SUCCESS,
  payload: data,
});
export const getListError = (data) => ({
  type: GET_LIST_ERROR,
  payload: data,
});
export const setList = (data) => ({
  type: SET_LIST,
  payload: data,
});

// API 호출 함수
export function* getList() {
  const data = yield axios.get('https://jsonplaceholder.typicode.com/posts');

  if (!isEmpty(data) && data.status === 200) {
    yield put(setList(data.data));
  }

  return data;
}

const initState = {};

/**
 * @function list
 * @description list Reducer
 */
// list Reducer
const list = (state = initState, action) => {
  switch (action.type) {
    case SET_LIST:
      return action.payload;
    case RESET_LIST:
      return initState;
    default:
      return state;
  }
};

export default list;
