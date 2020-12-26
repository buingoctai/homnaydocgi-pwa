import request from 'srcRoot/utils/request';

export const getAllPost = (param) => {
  return request(`${process.env.API_BASE}/blog/allPost`, {
    method: 'POST',
    data: { ...param },
  });
};

export const getDetailPost = (param) => {
  return request(`${process.env.API_BASE}/blog/getDetailPost`, {
    method: 'POST',
    data: { ...param },
  });
};
