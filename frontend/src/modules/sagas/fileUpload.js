import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { isEmpty } from '../../utils/utils';
import { reqFileUploadError, reqFileUploadSuccess, REQ_FILE_UPLOAD } from '../actions/fileUpload';

// API 호출 함수
export function* reqUpload(payload) {
  console.log('reqUpload()');
  console.log('payload', payload);
  const data = yield axios.post('/file/uploadTest');

  try {
    console.log('upload Data', data);
    if (!isEmpty(data) && data.status === 200) {
      yield put(reqFileUploadSuccess(data));
    }
  } catch (error) {
    yield put(reqFileUploadError(data));
  }

  return data;
}

// API 호출 SAGA
export function* reqFileUploadSaga() {
  yield takeEvery(REQ_FILE_UPLOAD, reqUpload);
}
