export const initState = {
  isAuthUser: !!localStorage.getItem('user'),
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  emailDuplicate: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  user: JSON.parse(localStorage.getItem('user')) || {},
  loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const EMAIL_DUPLICATE_REQUEST = 'EMAIL_DUPLICATE_REQUEST';
export const EMAIL_DUPLICATE_SUCCESS = 'EMAIL_DUPLICATE_SUCCESS';
export const EMAIL_DUPLICATE_FAILURE = 'EMAIL_DUPLICATE_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// 액션 함수 정의
export const emailduplicateRequestAction = (data) => ({
  type: EMAIL_DUPLICATE_REQUEST,
  data,
});
export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});
export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});
export const signupRequestAction = (data) => ({
  type: SIGN_UP_REQUEST,
  data,
});
/**
 * @function user
 * @description user Reducer
 */
// user Reducer
const user = (state = initState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isAuthUser: true,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.data,
        isAuthUser: true,
        logInLoading: false,
        logInDone: true,
        logInError: null,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isAuthUser: true,
        logInLoading: false,
        logInDone: true,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case EMAIL_DUPLICATE_REQUEST:
      return {
        emailDuplicate: false,
      };
    case EMAIL_DUPLICATE_SUCCESS:
      return {
        emailDuplicate: true,
      };
    case EMAIL_DUPLICATE_FAILURE:
      return {
        emailDuplicate: false,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        signUpError: null,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: false,
        signUpError: action.error,
      };
    default:
      return state;
  }
};
export default user;
