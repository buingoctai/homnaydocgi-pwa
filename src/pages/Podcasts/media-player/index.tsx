import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import { useRecoilState } from 'recoil';
import { audioState } from '../podcasts-state';
import IconPlay from 'srcRoot/static/svg/icon-outline-play-btn.svg';
import IconNext from 'srcRoot/static/svg/icon-outline-next-btn.svg';
import IconPrevious from 'srcRoot/static/svg/icon-outline-previous-btn.svg';
import IconPlaying from 'srcRoot/static/gif/icon-playing-gif.gif';
import IconPause from 'srcRoot/static/svg/icon-outline-pause-btn.svg';

const STATUS = {
  LOAED: 'LOADED',
  PLAYING: 'PLAYING',
  PAUSE: 'PAUSE',
  PLAYED: 'PLAYED',
  ERROR: 'ERROR',
};
const MediaPlayer = () => {
  const [audio, setAudio] = useRecoilState(audioState);
  const [selected] = audio['selected'] || [];

  const [status, setStatus] = useState('');
  const [time, setTime] = useState({ current: 0, duration: 1 });
  const playerRef = useRef(null);
  const progressRef = useRef(null);

  const onCanPlayAudio = useCallback(() => {
    console.log('can play');
    setTime({
      current: Math.ceil(playerRef.current.currentTime),
      duration: Math.ceil(playerRef.current.duration),
    });
    setStatus(STATUS['PLAYING']);
    playerRef.current.play();
  }, [status]);

  const onPlayAudio = useCallback(() => {
    switch (status) {
      case STATUS['PAUSE']:
        setStatus(STATUS['PLAYING']);
        playerRef.current.play();
        break;
      case STATUS['PLAYING']:
        setStatus(STATUS['PAUSE']);
        playerRef.current.pause();
        break;
      default:
        break;
    }
  }, [status]);

  const onTimeUpdateAudio = useCallback(() => {
    setTime({
      current: Math.ceil(playerRef.current.currentTime),
      duration: Math.ceil(playerRef.current.duration),
    });
  }, [status]);

  const secondsToHms = useCallback((d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h : '';
    var mDisplay = m > 0 && h > 0 ? ':' + m : m;
    var sDisplay = ':' + s;
    return `${hDisplay}${mDisplay}${sDisplay}`;
  }, []);

  const onEndAudio = useCallback(() => {
    setAudio([]);
  }, []);

  console.log('time change', time);

  return selected ? (
    <div className="media-player-container">
      <div className="level-left">
        <img src={IconPlaying} />
      </div>
      <div className="level-center">
        <div className="media-action">
          <img src={IconNext} className="action__btn" />
          <div className="action__btn btn-wrapper">
            <img src={status === STATUS['PLAYING'] ? IconPause : IconPlay} onClick={onPlayAudio} />
          </div>
          <img src={IconPrevious} className="action__btn" />
        </div>
        <div className="media-progress">
          <span className="time">{secondsToHms(time.current)}</span>
          <div
            className="progress"
            ref={progressRef}
            style={{
              backgroundImage: `linear-gradient(to right,rgb(255, 255, 255) 0%,rgb(255, 255, 255) ${
                (time.current / time.duration) * 100
              }%,rgb(155, 163, 173) ${
                (time.current / time.duration) * 100
              }%,rgb(150, 163, 173) 100%)`,
            }}
          ></div>
          <span className="time">{secondsToHms(time.duration)}</span>
        </div>
      </div>
      <div className="level-right">
        <img src={selected?.thumb} />
      </div>
      <audio
        id="media-player"
        ref={playerRef}
        data-html5-video
        preload="auto"
        src={selected?.url}
        onCanPlay={onCanPlayAudio}
        onTimeUpdate={onTimeUpdateAudio}
        onEnded={onEndAudio}
      />
    </div>
  ) : null;
};

export default MediaPlayer;
