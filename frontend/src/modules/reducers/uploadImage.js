import axios from 'axios';
import { put } from 'redux-saga/effects';
import { reducerUtils } from '../../utils/asyncUtils';
import { isEmpty } from '../../utils/utils';
import {
  REQ_IMAGE,
  REQ_IMAGE_ERROR,
  REQ_IMAGE_SUCCESS,
  reqImageSuccess,
  reqImageError,
} from '../actions/uploadImage';

// API 호출 함수
export function* reqUpload(payload) {
  console.log('reqUpload()');
  console.log('payload', payload);
  const key = '7999c85a7e299b3d28bb4cef59f5e1cc';
  const data = yield axios.post('/1/upload?key=' + key, payload);

  try {
    console.log('upload Data', data);
    if (!isEmpty(data) && data.status === 200) {
      yield put(reqImageSuccess(data));
    }
  } catch (error) {
    yield put(reqImageError(data));
  }

  return data;
}

const initState = reducerUtils.initial();

const uploadImage = (state = initState, action) => {
  const { type } = action;

  switch (type) {
    case REQ_IMAGE:
      return state;
    case REQ_IMAGE_SUCCESS:
      return state;
    case REQ_IMAGE_ERROR:
      return state;
    default:
      return state;
  }
};

export default uploadImage;
