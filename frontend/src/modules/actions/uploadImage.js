export const REQ_IMAGE = 'REQ_IMAGE';
export const REQ_IMAGE_SUCCESS = 'REQ_IMAGE_SUCCESS';
export const REQ_IMAGE_ERROR = 'REQ_IMAGE_ERROR';

export const reqImage = (data) => ({
  type: REQ_IMAGE,
  payload: data,
});
export const reqImageSuccess = (data) => ({
  type: REQ_IMAGE_SUCCESS,
  payload: data,
});
export const reqImageError = (error) => ({
  type: REQ_IMAGE_ERROR,
  payload: error,
});
