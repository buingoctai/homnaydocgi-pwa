import React, { useCallback } from 'react';
import { Audio } from 'srcRoot/enitities/Audio';
import { useRecoilState } from 'recoil';
import { currentAudioState } from '../podcasts-state';
import IconPlay from 'srcRoot/static/svg/icon-solid-play-btn.svg';

interface Props {
  key: number;
  index: number;
  style: object;
  data: Audio;
}
const PodcastItem = (props: Props) => {
  const { key, index, style, data } = props;
  const [, setCurrentAudio] = useRecoilState(currentAudioState);

  const handlePlayAudio = useCallback(() => {
    setCurrentAudio({ data: [data], idx: index });
  }, [data]);

  return (
    <div key={key} style={style} className="audio-item-wrap" onTouchEnd={handlePlayAudio}>
      <div className="audio-item">
        <div className="avatar">
          <img src={data.thumb} loading="lazy" width="100%" height="100%" />
          <img src={IconPlay} loading="lazy" className="play__btn" />
        </div>
        <div className="name truncate">{data.audioName}</div>
        <div className="play__btn"></div>
      </div>
    </div>
  );
};

export default PodcastItem;
