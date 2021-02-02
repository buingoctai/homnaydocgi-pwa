import { useEffect, useState, useRef } from 'react';
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

export const useGetAllArticle = (pageIndex = 1) => {
  const [response, setResponse] = useState({ totalRecord: 0, data: [] });

  useEffect(() => {
    console.log('### call api');
    getAllPost({
      // paging: { pageIndex, pageSize: 5 },
      // orderList: { orderBy: 'SubmitDate', orderType: 'DESC' },
      pageIndex: -1,
      pageSize: 5,
      orderBy: 'SubmitDate',
      orderType: 'DESC',
    })
      .then((result) => {
        const updateData = [...response.data, ...result.data];
        const newResult = { totalRecord: result.totalRecord, data: updateData };
        setResponse(newResult);
      })
      .catch(() => {});
  }, [pageIndex]);
  return [response.totalRecord, response.data];
};

export const useDetailArticle = (id, onUpdateListUI) => {
  const [data, setData] = useState({});
  const [articleId, setArticleId] = useState(id);

  // if(!articleId){
  //   return [{},setArticleId]
  // }
  useEffect(() => {
    if (!articleId) {
      return [{}, setArticleId];
    }

    getDetailPost({
      id: articleId,
    })
      .then((res) => {
        setData(res);
        onUpdateListUI(articleId);
      })
      .catch(() => {});
  }, [articleId]);
  return [data, setArticleId];
};
