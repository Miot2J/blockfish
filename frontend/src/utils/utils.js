export const isEmpty = (value) => {
  if (value === null) return true;
  if (typeof value === 'undefined') return true;
  if (typeof value === 'string' && value === '') return true;
  if (Array.isArray(value) && value.length < 1) return true;
  if (
    typeof value === 'object' &&
    value.constructor.name === 'Object' &&
    Object.keys(value).length < 1 &&
    Object.getOwnPropertyNames(value) < 1
  )
    return true;
  return false;
};

// 패스워드 검증
export const regExpPwd = (str) => {
  const regExp1 = /[a-z|A-Z]/;
  const regExp2 = /[0-9]/;
  const regExp3 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;

  if (str.length < 8 || str.length > 20) {
    return false;
  }
  if (regExp1.test(str) && regExp2.test(str) && regExp3.test(str)) {
    return true;
  }
  return false;
};

let timer = null;
export const debounce = (callback, time) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    callback();
  }, time);
};
