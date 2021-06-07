import { takeEvery } from '@redux-saga/core/effects';
import { createPromiseSaga, handleAsyncActions, reducerUtils } from '../../utils/asyncUtils';
import { getList, GET_LIST, GET_LIST_ERROR, GET_LIST_SUCCESS } from '../actions/list';
import { REQ_IMAGE } from '../actions/uploadImage';
import { reqUpload } from '../reducers/uploadImage';

const getListSaga = createPromiseSaga(GET_LIST, getList);

// API 호출 SAGA
export function* fetchSaga() {
  yield takeEvery(GET_LIST, getListSaga);
  yield takeEvery(REQ_IMAGE, reqUpload);
}

const initState = { list: reducerUtils.initial() };

/**
 * @function fetchData
 * @description API 호출 Reducer / API 호출 결과 저장
 */
export default function fetchData(state = initState, action) {
  switch (action.type) {
    case GET_LIST:
    case GET_LIST_SUCCESS:
    case GET_LIST_ERROR:
      return handleAsyncActions(GET_LIST, 'list', true)(state, action);
    default:
      return state;
  }
}
