import React from 'react';
import { Audio } from 'srcRoot/enitities/Audio';

interface Props {
  key: number;
  index: number;
  style: object;
  data: Audio;
  thumb: string;
}
const PodcastItem = (props: Props) => {
  const { key, index, style, data, thumb } = props;
  console.log(data, thumb);

  return (
    <div key={key} style={style} className="audio-item-wrap">
      <div className="audio-item">
        <div className="avatar">
          <img src={thumb} loading="lazy" width="100%" height="100%" />
        </div>
        <div className="name truncate">{data.audioName}</div>
        <div className="play__btn"></div>
      </div>
    </div>
  );
};

export default PodcastItem;
