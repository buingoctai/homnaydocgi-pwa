import React, { useState } from 'react';
import { useDetailArticle } from 'srcRoot/Hooks';

const imgDefault =
  'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/70930564_923020218065096_7174011323368341504_n.jpg?_nc_cat=100&ccb=2&_nc_sid=174925&_nc_ohc=JebNwt_2DD4AX9D4CiP&_nc_ht=scontent.fsgn5-5.fna&oh=5c30346edb198746933fca88f14fbd63&oe=5FE85A14';
const Content = ({ post, listRef, cache, index, readedList, setReadedList }) => {
  const [detailPost, setDetailPost] = useDetailArticle(post.Id);
  let newReadedList = {};
  const onReadMore = async () => {
    console.log('list ref', listRef);
    cache.clear(index);
    listRef.recomputeRowHeights(index);
    listRef.forceUpdateGrid();
    newReadedList = { ...readedList };
    newReadedList[post.Id] = true;
    setReadedList(newReadedList);
  };
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div>
      <span style={{ fontSize: '25px', fontWeight: '400px' }}>
        {capitalize(post.Title.toLowerCase())}
      </span>
      <p style={{ marginTop: '0px', fontSize: '25px', fontWeight: '400px' }}>
        {readedList[post.Id] ? detailPost.Content : post.Brief}
        {!readedList[post.Id] && (
          <a href="#" onClick={() => onReadMore()} style={{ textDecoration: 'none' }}>
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
