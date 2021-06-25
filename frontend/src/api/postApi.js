import axios from 'axios';

const postApi = (url, data) =>
  axios.post(url, data, {
    'Content-Type': 'application/json',
  });

export default postApi;
