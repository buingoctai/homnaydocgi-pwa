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

export const useGetAllArticle = (headArticle) => {
  const [response, setResponse] = useState({ totalRecord: 0, data: [] });
  const [isLoading, setIsLoading] = useState(false);
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
  const foundHead = useRef(false);
  const setFoundHead = (value) => {
    foundHead.current = value;
  };

  useEffect(() => {
    setIsLoadData(true);
    setIsLoading(true);
    getAllPost({
      pageIndex: currentPage.current,
      pageSize: 4,
      orderBy: 'SubmitDate',
      orderType: 'DESC',
      headArticle: foundHead.current ? null : headArticle,
      found: foundHead.current,
    })
      .then((result) => {
        const updateData = [...response.data, ...result.data];
        const newResult = { totalRecord: result.totalRecord, data: updateData };

        setFoundHead(result.found);
        setResponse(newResult);
        setIsLoadData(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoadData(false);
        setIsLoading(false);
      });
  }, [page]);

  return [response.totalRecord, response.data, currentPage, setCurrentPage, isLoadData, isLoading];
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

export const useEventListener = (eventName, handler, root = window, capture = true) => {
  const savedHandler = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = root && root.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    root.addEventListener(eventName, eventListener, capture);

    return () => root.removeEventListener(eventName, eventListener, capture);
  }, [eventName, root]);
};
