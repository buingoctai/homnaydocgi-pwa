import React from 'react';

interface Props {
  keyItem: string | number;
  style: object;
  data: any;
  index: number;
}
const CollectionItem = (props: Props) => {
  const { keyItem, style, data, index } = props;
  if (!data) return null;
  return (
    <div className="collection-item" key={keyItem} style={style}>
      <img
        src={`https://source.unsplash.com/random/200x200?sig=${index}`}
        width="90%"
        height="90%"
        loading="lazy"
      />
      <span className="truncate">{data.name}</span>
    </div>
  );
};

export default CollectionItem;
