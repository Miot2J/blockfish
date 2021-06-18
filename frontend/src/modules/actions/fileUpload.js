export const REQ_FILE_UPLOAD = 'REQ_FILE_UPLOAD';
export const REQ_FILE_UPLOAD_SUCCESS = 'REQ_FILE_UPLOAD_SUCCESS';
export const REQ_FILE_UPLOAD_ERROR = 'REQ_FILE_UPLOAD_ERROR';

export const reqFileUpload = (data) => ({
  type: REQ_FILE_UPLOAD,
  payload: data,
});
export const reqFileUploadSuccess = (data) => ({
  type: REQ_FILE_UPLOAD_SUCCESS,
  payload: data,
});
export const reqFileUploadError = (error) => ({
  type: REQ_FILE_UPLOAD_ERROR,
  payload: error,
});
