import React, { useEffect, useState, useRef } from 'react';
import { CellMeasurerCache } from 'react-virtualized';

import { useGetAllArticle } from 'srcRoot/Hooks';
import Header from './components/header';
import Content from './components/content';

var heightStore = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});

const enhance = (Article) => () => {
  const [currentPage, setCurrentPage] = useState(-1);

  const [totalRecord, data] = useGetAllArticle(currentPage);
  const [readedList, setReadedList] = useState({});
  console.log('data', data);

  useEffect(() => {
    // window.addEventListener('scroll', () => {
    //   console.log('scroll');
    //   // const scrollTop = document.documentElement.scrollTop;
    //   // const realHeight = document.documentElement.offsetHeight;
    //   // const heightOnSroll = scrollTop + window.innerHeight;

    //   // if (heightOnSroll >= realHeight - 100 && scrollTop) {
    //   //   console.log('### load more');
    //   // }
    // });

    const list=document.getElementsByClassName('ReactVirtualized__Grid ReactVirtualized__List')[0];
    console.log('list',list);
    if(list) {
      list.addEventListener('scroll',()=>{
        console.log('scroll event fired!');
      });
    }
   
  }, [totalRecord]);

  const renderItem = ({ index, style, listRef }) => {
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

  return <Article totalRecord={totalRecord} heightStore={heightStore} renderItem={renderItem} />;
};

export default enhance;
