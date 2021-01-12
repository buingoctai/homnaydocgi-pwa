import { useEffect, useState } from 'react';
import { getAllPost, getDetailPost } from 'srcRoot/services/Article';

export const useDebounce = (value, deplay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, deplay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export const useGetAllArticle = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllPost({
      paging: { pageIndex: -1, pageSize: 31 },
      orderList: { orderBy: 'SubmitDate', orderType: 'DESC' },
    })
      .then((res) => {
        setData(res);
      })
      .catch(() => {});
  }, []);
  return data;
};

export const useDetailArticle = (articleId) => {
  const [data, setData] = useState({});
  useEffect(() => {
    getDetailPost({
      id: articleId,
    })
      .then((res) => {
        setData(res);
      })
      .catch(() => {});
  }, []);
  return [data, setData];
};
