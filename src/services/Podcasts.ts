import { requestPost, requestGet } from 'srcRoot/utils/request';

export const getAllCollection = (param) => {
  return requestPost(`${process.env.API_BASE}/google-drive/getAllCollection`, {
    method: 'POST',
    data: { ...param },
  });
};

export const createCollection = (params) => {
  return requestPost(`${process.env.API_BASE}/google-drive/createFolder`, {
    method: 'POST',
    data: { ...params },
  });
};

export const getAllAudio = (param) => {
  return requestPost(`${process.env.API_BASE}/google-drive/getAllAudio`, {
    method: 'POST',
    data: { ...param },
  });
};

export const getThumb = (params) => {
  return requestPost(`${process.env.API_BASE}/audio/getThumb`, {
    method: 'POST',
    data: { ...params },
  });
};

export const createMp3 = (params) => {
  return requestPost(`${process.env.API_BASE}/google-drive/createMp3`, {
    method: 'POST',
    data: { ...params },
  });
};
