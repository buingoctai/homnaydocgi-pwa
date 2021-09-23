import React from 'react';
import {Collection} from 'srcRoot/enitities/Audio';
interface Props {
  keyItem: string | number;
  style: object;
  data: Collection;
  index: number;
}
const VALID_KEY_LIST = ["https://photo-zmp3.zadn.vn/cover/d/0/d/7/d0d772a6c3e35b3e768d5c3ebf644ecd.jpg",
 "https://photo-zmp3.zadn.vn/cover/2/e/9/6/2e966bf47b1989fdff7149c7a1b0f25e.jpg",
 "https://photo-zmp3.zadn.vn/cover/e/6/8/0/e680570f74b3497c95d96f6ba6db7b07.jpg",
 "https://photo-zmp3.zadn.vn/cover/0/a/e/f/0aef849d584c7e995073617f53b9ac24.jpg",
 "https://photo-zmp3.zadn.vn/cover/0/f/d/1/0fd1da7445b21a752a1c4282b06f2cf0.jpg",
 "https://photo-zmp3.zadn.vn/cover/d/b/5/c/db5cf069b328c7858b2d9642cc6b4529.jpg",
 "https://photo-zmp3.zadn.vn/cover/9/5/1/b/951bb18f468ea711a81a0dd28a8797d4.jpg",
 "https://photo-zmp3.zadn.vn/cover/8/0/4/7/8047a5134646835763068f7439e17f2b.jpg",
 "https://photo-zmp3.zadn.vn/cover/e/3/d/4/e3d43659c6dc756f87f4e44220313f92.jpg",
 "https://photo-zmp3.zadn.vn/cover/1/c/c/8/1cc8ae9704ae8fb7e34487ce744083a9.jpg"
];
const getRandomImage = () => {
	return VALID_KEY_LIST[Math.floor(Math.random() * VALID_KEY_LIST.length)];
};

const CollectionItem = (props: Props) => {
  const { keyItem, style, data, index } = props;
  if (!data) return null;
  return (
    <div className="collection-item" key={keyItem} style={style}>
      <img
        src={getRandomImage()}
        width="90%"
        height="90%"
        loading="lazy"
      />
      <span className="truncate">{data.collectionName}</span>
    </div>
  );
};

export default CollectionItem;
