import React, { useEffect, useState, useRef, useCallback} from 'react';
import { CellMeasurerCache } from 'react-virtualized';

import { useGetAllArticle } from 'srcRoot/Hooks/use-fetch-article';
import { PopoverManager } from '@taibn.dev.vn/h-popover';
import Header from './components/header';
import Content from './components/content';

var heightStore = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});
const VITRUALIZED_CLASS = 'ReactVirtualized__Grid ReactVirtualized__List';
const BOTTOM_DISTENCE = 10;

const enhance = (Article) => ({ headArticle }) => {
  const listRef = useRef();

  const [totalRecord, data, currentPage, setCurrentPage, isLoadData, isLoading] = useGetAllArticle(
    headArticle
  );
  const [readedList, setReadedList] = useState({});

  useEffect(() => {
    const list = document.getElementsByClassName(VITRUALIZED_CLASS)[0];

    if (list) {
      list.addEventListener('scroll', () => {
        if (isLoadData.current) return;
        if (list.scrollTop + window.innerHeight >= list.scrollHeight - BOTTOM_DISTENCE) {
          const newPage = currentPage.current + 1;
          setCurrentPage(newPage);
        }
        
        PopoverManager.closeAllPopover();
      });
    }
  }, [totalRecord]);

  const renderItem = ({ index, style, listRef }) => {
    if (data.length === 0) return null;

    return (
      <div style={{ ...style }} key={data[index].Id}>
        <div className="article-item">
          <Header
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

  console.log('taibnlogs render enhance Article');


  return (
    <Article
      totalRecord={data.length}
      heightStore={heightStore}
      renderItem={renderItem}
      listRef={listRef}
      firstArticle={data[0]}
      isLoading={isLoading}
    />
  );
};

export default enhance;
