import { requestPost, requestGet } from 'srcRoot/utils/request';

export const getAllPost = (param) => {
  return requestPost(`${process.env.API_BASE}/blog/allPost`, {
    method: 'POST',
    data: { ...param },
  });
};

export const getDetailPost = (param) => {
  return requestGet(`${process.env.API_BASE}/blog/getDetailPost`, {
    method: 'GET',
    data: { ...param },
  });
};
