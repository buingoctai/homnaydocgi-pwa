import React, { useCallback } from 'react';
import { Audio } from 'srcRoot/enitities/Audio';
import { useRecoilState } from 'recoil';
import { audioState } from '../podcasts-state';

interface Props {
  key: number;
  index: number;
  style: object;
  data: Audio;
}
const PodcastItem = (props: Props) => {
  const { key, index, style, data } = props;
  const [audio, setAudio] = useRecoilState(audioState);

  const handlePlayAudio = useCallback(() => {
    setAudio([data]);
  }, []);

  return (
    <div key={key} style={style} className="audio-item-wrap" onClick={handlePlayAudio}>
      <div className="audio-item">
        <div className="avatar">
          <img src={data.thumb} loading="lazy" width="100%" height="100%" />
        </div>
        <div className="name truncate">{data.audioName}</div>
        <div className="play__btn"></div>
      </div>
    </div>
  );
};

export default PodcastItem;
