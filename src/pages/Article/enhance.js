import React, { useEffect, useState, useRef } from 'react';
import { CellMeasurerCache } from 'react-virtualized';

import { useGetAllArticle } from 'srcRoot/Hooks';
import { PopoverManager } from 'popover-windows';
import Header from './components/header';
import Content from './components/content';
import { GLOBAL_POPUP_IDENTITY } from 'srcRoot/utils/constants';

var heightStore = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});

const enhance = (Article) => ({ headArticle }) => {
  const listRef = useRef();

  const [totalRecord, data, currentPage, setCurrentPage, isLoadData] = useGetAllArticle(
    headArticle
  );
  const [readedList, setReadedList] = useState({});

  useEffect(() => {
    const list = document.getElementsByClassName(
      'ReactVirtualized__Grid ReactVirtualized__List'
    )[0];
    if (list) {
      list.addEventListener('scroll', () => {
        if (isLoadData.current) return;
        if (list.scrollTop + window.innerHeight >= list.scrollHeight - 10) {
          const newPage = currentPage.current + 1;
          setCurrentPage(newPage);
        }
        PopoverManager.closePopover(GLOBAL_POPUP_IDENTITY);
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

  return (
    <Article
      totalRecord={data.length}
      heightStore={heightStore}
      renderItem={renderItem}
      listRef={listRef}
      firstArticle={data[0]}
    />
  );
};

export default enhance;
