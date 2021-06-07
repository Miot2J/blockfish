import { all, fork } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import { fetchUserSaga } from '../sagas/user';
import user from '../actions/user';
import list from '../actions/list';
import modal from './modal';
import uploadImage from './uploadImage';
import { fetchSaga } from '../sagas/saga';

const rootReducer = combineReducers({
  list,
  user,
  modal,
  uploadImage,
});

export function* rootSaga() {
  yield all([fork(fetchSaga), fork(fetchUserSaga)]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
