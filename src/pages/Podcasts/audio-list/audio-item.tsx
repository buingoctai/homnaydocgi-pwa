import React, { useCallback, useRef } from 'react';
import { Audio } from 'srcRoot/enitities/Audio';
import { useRecoilState } from 'recoil';
import { currentAudioState } from '../podcasts-state';
import IconPlay from 'srcRoot/static/svg/icon-solid-play-btn.svg';
import IconList from 'srcRoot/static/svg/icon-solid-list.svg';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import RecommendAudio from './recommend-audio';
import { capitalizeFirstLetter } from 'srcRoot/utils/index-v2';

interface Props {
  key: number;
  index: number;
  style: object;
  data: Audio;
}
const PodcastItem = (props: Props) => {
  const animeRef = useRef(null);

  const { key, index, style, data } = props;
  const [, setCurrentAudio] = useRecoilState(currentAudioState);

  const handlePlayAudio = useCallback(
    (e) => {
      setCurrentAudio({ data: [data], idx: index });
      setTimeout(() => {
        animeRef.current.blur();
      }, 200);
    },
    [data]
  );

  return (
    <div key={key} style={style} className="audio-item-wrap" onClick={handlePlayAudio}>
      <div className="audio-item" ref={animeRef} tabIndex={0}>
        <div className="avatar">
          <img src={data.thumb} loading="lazy" width="100%" height="100%" />
          <img src={IconPlay} loading="lazy" className="play__btn" />
        </div>
        <div className="name truncate">{capitalizeFirstLetter(data.audioName)}</div>
        <img
          src={IconList}
          width="34px"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            PopoverManager.openPopover({
              ...PopupIdentities['RECOMMEND_AUDIOS'],
              name: `${PopupIdentities['RECOMMEND_AUDIOS'].name + index}`,
            });
          }}
        />
      </div>
      <Popover
        identity={{
          ...PopupIdentities['RECOMMEND_AUDIOS'],
          name: `${PopupIdentities['RECOMMEND_AUDIOS'].name + index}`,
        }}
        style={{ width: 'calc(100% - 16px)', bottom: '0px' }}
        className="popup-anime-bottom-fade-in recommend-audio-pop"
        content={<RecommendAudio audioId={data.audioId} audioName={data.audioName} />}
      />
    </div>
  );
};

export default PodcastItem;
