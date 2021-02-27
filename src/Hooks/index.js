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

export const useGetAllArticle = (listRef) => {
  const [response, setResponse] = useState({ totalRecord: 0, data: [] });
  const [page, setPage] = useState(-1);
  const currentPage = useRef(-1);
  const setCurrentPage = (value) => {
    currentPage.current = value;
    setPage(value);
    listRef.current.recomputeRowHeights();
    listRef.current.forceUpdateGrid();
  };

  useEffect(() => {
    getAllPost({
      // paging: { pageIndex, pageSize: 5 },
      // orderList: { orderBy: 'SubmitDate', orderType: 'DESC' },
      pageIndex: currentPage.current,
      pageSize: 3,
      orderBy: 'SubmitDate',
      orderType: 'DESC',
    })
      .then((result) => {
        const updateData = [...response.data, ...result.data];
        const newResult = { totalRecord: result.totalRecord, data: updateData };
        setResponse(newResult);
      })
      .catch(() => {});
  }, [page]);
  console.log('### call api', response.data);

  return [response.totalRecord, response.data, currentPage, setCurrentPage];
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
