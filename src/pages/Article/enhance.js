import React, { useEffect, useState, useRef } from 'react';
import { CellMeasurerCache } from 'react-virtualized';

import { useGetAllArticle } from 'srcRoot/Hooks';
import Header from './components/Header';
import Content from './components/Content';

var heightStore = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});

const enhance = (Article) => () => {
  const [currentPage, setCurrentPage] = useState(-1);

  const [totalRecord, data] = useGetAllArticle(currentPage);
  const [readedList, setReadedList] = useState({});
  console.log('data', data);

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     // const article=document.getElementById('article');
  //     // const contentHeight=article.offsetHeight;
  //     // const yoffset=window.pageYOffset;
  //     // const y=yoffset+window.innerHeight;

  //     // console.log('### y',y);
  //     // console.log('### contentHeight',contentHeight);
  //     const scrollTop = document.documentElement.scrollTop;
  //     const realHeight = document.documentElement.offsetHeight;
  //     const heightOnSroll = scrollTop + window.innerHeight;

  //     console.log('###', heightOnSroll, realHeight);
  //     if (heightOnSroll >= realHeight - 100 && scrollTop) {
  //       console.log('### load more', currentPage);
  //       const nextPage = currentPage + 1;
  //       setCurrentPage(nextPage);
  //     }
  //   });
  // }, []);

  const renderItem = ({ index, style, listRef }) => {
    return (
      <div style={{ ...style, padding: '0px 10px' }}>
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
