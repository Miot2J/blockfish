import { fork, put, takeLatest, call, all } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  EMAIL_DUPLICATE_REQUEST,
  EMAIL_DUPLICATE_SUCCESS,
  EMAIL_DUPLICATE_FAILURE,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../actions/user';
import axios from 'axios';

function logInAPI(data) {
  return axios.post('/user/login', data, { withCredentials: true });
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // },
  // credentials: 'same-origin',
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    const link = action.data.history;
    if (result.data.response === 'success') {
      yield put({
        type: LOG_IN_SUCCESS,
        data: result.data,
      });
      alert('로그인 성공했습니다.');
      link.push('/blockfish');
    } else {
      yield put({
        type: LOG_IN_FAILURE,
        data: result.data,
      });
      alert('로그인 실패했습니다.');
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response,
    });
  }
}

function emailduplicateAPI(data) {
  return axios.post('/user/duplicate', data);
}

function* emailDuplicate(action) {
  try {
    const result = yield call(emailduplicateAPI, action.data);
    if (result.data.response === 'success') {
      yield put({
        type: EMAIL_DUPLICATE_SUCCESS,
        data: result.data,
      });
    } else {
      yield put({
        type: EMAIL_DUPLICATE_FAILURE,
        data: result.data,
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: EMAIL_DUPLICATE_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user/signup', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    const link = action.data.history;

    // yield delay(1000);
    if (result.data.response === 'success') {
      yield put({
        type: SIGN_UP_SUCCESS,
        data: result.data,
      });
      alert('회원가입 성공했습니다.');
      link.push('/login');
    } else {
      yield put({
        type: SIGN_UP_FAILURE,
        data: result.data,
      });
      alert('회원가입에 실패했습니다.');
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
    alert('회원가입에 실패했습니다.');
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchEmailDuplicate() {
  yield takeLatest(EMAIL_DUPLICATE_REQUEST, emailDuplicate);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// API 호출 SAGA
export function* fetchUserSaga() {
  yield all([fork(watchLogIn), fork(watchSignUp), fork(watchEmailDuplicate)]);
}
