import { fork, delay, put, takeLatest, call, all } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../actions/user';
import axios from 'axios';

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    console.log('saga logIn', action.data);
    const result = yield call(logInAPI, action.data);
    console.log(result.message);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user/signup', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// API 호출 SAGA
export function* fetchUserSaga() {
  yield all([fork(watchLogIn), fork(watchSignUp)]);
}
