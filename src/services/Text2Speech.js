import { requestPost, requestGet } from 'srcRoot/utils/request';

export const text2Speech = (params) => {
  return requestPost(`${process.env.API_BASE}/ai/text2speech`, {
    method: 'POST',
    data: params,
  });
};
