import { reducerUtils } from '../../utils/asyncUtils';
import {
  REQ_FILE_UPLOAD,
  REQ_FILE_UPLOAD_ERROR,
  REQ_FILE_UPLOAD_SUCCESS,
} from '../actions/fileUpload';

const initState = reducerUtils.initial();

const uploadImage = (state = initState, action) => {
  const { type } = action;

  switch (type) {
    case REQ_FILE_UPLOAD:
      return state;
    case REQ_FILE_UPLOAD_SUCCESS:
      return state;
    case REQ_FILE_UPLOAD_ERROR:
      return state;
    default:
      return state;
  }
};

export default uploadImage;
