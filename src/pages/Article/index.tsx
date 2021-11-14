import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { useRecoilValue } from 'recoil';
import { filterState } from 'srcRoot/recoil/appState';
import Header from './components/header';
import Content from './components/content';
import Filter from './components/filter';
import SkeletonV2 from 'srcRoot/components/SkeletonV2';
import LoadingV2 from 'srcRoot/components/LoadingV2';
import useFetchData from 'srcRoot/Hooks/use-fetch-data';
import { getAllPost } from 'srcRoot/services/Article';
import IconEmpty from 'srcRoot/static/image/icon-empty-search.png';
import { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';

import './style.scss';

var heightStore = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});

const Article = ({ headArticle }) => {
  const [readedList, setReadedList] = useState({});
  const [page, setPage] = useState({ number: 1 });
  const filter = useRecoilValue(filterState);
  const cached = useRef({ data: [], totalRecord: undefined });
  const listRef = useRef(null);

  const payload = useMemo(() => {
    return {
      paging: { pageIndex: page.number, pageSize: 6 },
      orderList: { orderBy: 'SubmitDate', orderType: 'DESC' },
      headArticle: headArticle,
      found: false,
      filter,
    };
  }, [page, filter]);

  const { response, status } = useFetchData({
    api: getAllPost,
    payload,
    retryOptions: { retries: 3, retryDelay: 300 },
    forceFetch: page,
    delayRes: 600,
  });

  // cached.current = useMemo(() => {
  //   console.log('taibnlog xóa cached on change filter');

  //   return { data: [], totalRecord: 0 };
  // },[filter]);

  useEffect(() => {
    if (filter) {
      cached.current = { data: [], totalRecord: 0 };
      setPage({ number: 1 });
    }
  }, [filter]);

  const { data, totalRecord } = useMemo(() => {
    if (response)
      cached.current = {
        data: [...cached.current.data, ...response['data']],
        totalRecord: response['totalRecord'],
      };

    return {
      data: cached.current['data'],
      totalRecord: cached.current['totalRecord'],
    };
  }, [response]);

  const isLoading = useMemo(() => {
    return status === 'LOADING';
  }, [status]);

  const handleScrollList = useCallback(
    (event) => {
      if (!event) return;
      const isScrollBottom = event.scrollTop + window.innerHeight >= event.scrollHeight - 10;

      if (isScrollBottom && !isLoading) setPage({ number: page.number + 1 });
    },
    [page, isLoading]
  );

  const renderItem = ({ index, style, listRef, isScrolling }) => {
    if (data.length === 0 || !data[index]) return null;

    return (
      <div style={{ ...style }} key={data[index].Id}>
        <div className="article-item">
          <Header
            index={index}
            id={data[index].Id}
            title={data[index].Title}
            author={data[index].Author}
            time={data[index].SubmitDate}
          />
          <Content
            index={index}
            post={data[index]}
            listRef={listRef}
            heightStore={heightStore}
            readedList={readedList}
            setReadedList={setReadedList}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (totalRecord === 0) {
      setTimeout(() => {
        PopoverManager.openPopover(PopupIdentities['FILTER_ARTICLE']);
      }, 4000);
    }
  }, [totalRecord]);

  return (
    <>
      <Filter />
      {totalRecord ? (
        <div className="article" id="article">
          <div
            className="article-list"
            style={isLoading ? { height: 'calc(100% - 44px)' } : { height: '100%' }}
          >
            <AutoSizer>
              {({ width, height, isScrolling }) => {
                return (
                  <List
                    width={width}
                    height={height}
                    rowHeight={heightStore.rowHeight}
                    rowRenderer={({ index, key, style, parent, isScrolling }) => (
                      <CellMeasurer
                        cache={heightStore}
                        key={key}
                        parent={parent}
                        rowIndex={index}
                        columnIndex={0}
                      >
                        {renderItem({
                          index,
                          style,
                          listRef: listRef,
                          isScrolling,
                        })}
                      </CellMeasurer>
                    )}
                    rowCount={totalRecord}
                    onScroll={handleScrollList}
                    ref={listRef}
                  />
                );
              }}
            </AutoSizer>
          </div>
          <LoadingV2
            show={isLoading}
            type="LOADING_ARTICLE"
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #E5EFFF',
              borderTop: '2px solid #0068FF',
              borderwidth: '2px',
              animation: 'loadingAnim 1s cubic-bezier(0, 0, 0, 0) infinite',
            }}
          />
        </div>
      ) : totalRecord === 0 ? (
        <div className="article-empty">
          <img src={IconEmpty} />
          <span>Tìm thấy bài viết rỗng! Thử lại</span>
        </div>
      ) : (
        [6, 5, 7].map((item, index) => <SkeletonV2 numLine={item} theme="light" />)
      )}{' '}
    </>
  );
};

export default Article;
