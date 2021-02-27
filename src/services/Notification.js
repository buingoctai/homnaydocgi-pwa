import { requestPost, requestGet } from 'srcRoot/utils/request';

export const saveSubscription = (params) => {
  return requestPost(`${process.env.API_BASE}/notification/saveSubscription`, {
    method: 'POST',
    data: params,
  });
};
