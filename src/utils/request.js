import axios from 'axios';

const requestPost = (url, options) => {
  return axios({
    url,
    ...options,
  });
};

const requestGet = (url, options) => {
  return axios.get(url, { params: { ...options.data } });
};

const HandleStatus = (response) => {
  const { status, data } = response;
  if (status === 200 || status === 201 || status === 201) {
    return data;
  } else {
    throw JSON.parse(data);
  }
};
axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return HandleStatus(response);
  },
  (error) => {
    const {
      response: { status, data },
    } = error;
    return HandleStatus({ status: status, data: JSON.stringify(data) });
  }
);

export { requestGet, requestPost };
