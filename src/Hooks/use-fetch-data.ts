import { useState, useEffect } from 'react';

type Props = {
  api: (payload: object) => Promise<any>;
  payload: object;
  forceFetch?: any;
  retryOptions?: { retries: number; retryDelay: number };
  defaultRes?: object;
  delayRes?: number;
};

const STATUS = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  DONE: 'DONE',
};

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};
/**
 * @param  {Props} props
 */
const useFetchData = (props: Props) => {
  const {
    api,
    payload,
    forceFetch,
    delayRes,
    retryOptions = { retries: 0, retryDelay: 0 },
  } = props;
  const [response, setResponse] = useState(props.defaultRes);
  const [status, setStatus] = useState<string>(STATUS['DONE']);

  useEffect(() => {
    setStatus(STATUS['LOADING']);
    const wrapper = (n: number) => {
      api(payload)
        .then(async (response) => {
          await delay(delayRes);
          setResponse(response);
          setStatus(STATUS['DONE']);
        })
        .catch(async (error) => {
          if (n > 0) {
            await delay(retryOptions.retryDelay);
            wrapper(--n);
          } else {
            setStatus(STATUS['ERROR']);
          }
        });
    };

    wrapper(retryOptions.retries);
  }, [forceFetch]);

  return { status, response, setResponse };
};

export default useFetchData;
export { STATUS };
