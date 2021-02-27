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

export const useGetAllArticle = () => {
  const [response, setResponse] = useState({ totalRecord: 0, data: [] });
  const [page, setPage] = useState(1);

  const currentPage = useRef(1);
  const setCurrentPage = (value) => {
    currentPage.current = value;
    setPage(value);
  };
  const isLoadData = useRef(false);
  const setIsLoadData = (value) => {
    isLoadData.current = value;
  };
  useEffect(() => {
    setIsLoadData(true);
    getAllPost({
      pageIndex: currentPage.current,
      pageSize: 4,
      orderBy: 'SubmitDate',
      orderType: 'DESC',
    })
      .then((result) => {
        const updateData = [...response.data, ...result.data];
        const newResult = { totalRecord: result.totalRecord, data: updateData };
        setResponse(newResult);
        setIsLoadData(false);
      })
      .catch(() => {
        setIsLoadData(false);
      });
  }, [page]);

  return [response.totalRecord, response.data, currentPage, setCurrentPage, isLoadData];
};

export const useDetailArticle = (id, onUpdateListUI) => {
  const [data, setData] = useState({});
  const [articleId, setArticleId] = useState(id);

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
