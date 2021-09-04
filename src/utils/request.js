import axios from 'axios';
import { PopupIdentities } from 'srcRoot/utils/constants';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';

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
    PopoverManager.openPopover(PopupIdentities['NOTI_ERROR']);
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
