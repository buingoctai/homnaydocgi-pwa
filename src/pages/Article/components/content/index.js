import React from 'react';
import { useDetailArticle } from 'srcRoot/Hooks';
import './style.scss';

const Content = ({ index, post, listRef, heightStore, readedList, setReadedList }) => {
  const { Id, Title, Brief } = post;
  const [detailPost, setDetailPost] = useDetailArticle(Id);
  let newReadedList = {};

  const onReadMore = async () => {
    heightStore.clear(index);
    listRef.recomputeRowHeights(index);
    listRef.forceUpdateGrid();
    newReadedList = { ...readedList };
    newReadedList[Id] = true;
    setReadedList(newReadedList);
  };
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <span className="title">{capitalize(Title.toLowerCase())}</span>
      <p className="content">
        {readedList[Id] ? detailPost.Content : Brief}
        {!readedList[Id] && (
          <a href="#" onClick={() => onReadMore()} className="button-more">
            ...Xem thêm
          </a>
        )}
      </p>
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        {readedList[post.Id] && imgDefault !== post.ImageUrl && (
          <img alt="ảnh" src={post.ImageUrl} />
        )}
      </div> */}
    </div>
  );
};

export default Content;
