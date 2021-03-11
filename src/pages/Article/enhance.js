import React, { useEffect, useState, useRef } from 'react';
import ReactDOM  from 'react-dom';
import { CellMeasurerCache } from 'react-virtualized';

import { useGetAllArticle } from 'srcRoot/Hooks';
import PopoverManager from 'srcRoot/pages/components/Popover/popover-manager';
import Header from './components/header';
import Content from './components/content';

var heightStore = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});

const enhance = (Article) => () => {
  const listRef = useRef();

  const [totalRecord, data, currentPage, setCurrentPage, isLoadData] = useGetAllArticle(
    heightStore
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
          console.log('scrool bottom');
          const newPage = currentPage.current + 1;
          // if (newPage === 4) return;
          
          console.log(currentPage.current);
          setCurrentPage(newPage);
        }
        PopoverManager.close();
      });
    }
  }, [totalRecord]);


 
  const renderItem = ({ index, style, listRef }) => {
    if (data.length === 0) return null;

    return (
      <div style={{ ...style }}>
        <div>
          <Header author={data[index].Author} time={data[index].SubmitDate} />
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
    />
  );
};

export default enhance;
