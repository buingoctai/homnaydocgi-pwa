import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentAudioState, CurrentAudio } from '../podcasts-state';
import IconPlay from 'srcRoot/static/svg/icon-outline-play-btn.svg';
import IconNext from 'srcRoot/static/svg/icon-outline-next-btn.svg';
import IconPrevious from 'srcRoot/static/svg/icon-outline-previous-btn.svg';
import IconPlaying from 'srcRoot/static/gif/icon-playing-gif.gif';
import IconPause from 'srcRoot/static/svg/icon-outline-pause-btn.svg';
import { AudioList } from 'srcRoot/enitities/Audio';
import { capitalizeFirstLetter } from 'srcRoot/utils/index-v2';
import { audioListState } from 'srcRoot/recoil/appState';
import { useHistory } from 'react-router-dom';

const STATUS = {
  /* server status */
  NON_LOAD: 'NON_LOAD',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
  /* user status */
  PLAYING: 'PLAYING',
  PAUSE: 'PAUSE',
};
interface Props {
  audioList: AudioList | object;
}
const MediaPlayer = (props: Props) => {
  const { audioList } = props;
  const history = useHistory();
  const routeData = history.location.state;

  const initCurrentAudio = useCallback((): CurrentAudio => {
    for (let i = 0; i < audioList['data'].length; i++) {
      if (audioList['data'][i].audioId === routeData?.audioId) {
        return { data: audioList['data'][i], idx: i };
      }
    }
    return { data: null, idx: null };
  }, [history, routeData, audioList]);

  const [currentAudio, setCurrentAudio] = useRecoilState(currentAudioState);

  const audio = currentAudio['data'];
  const idx = currentAudio['idx'];

  const [status, setStatus] = useState<{
    user: string;
    server: string;
  }>({
    user: STATUS['PAUSE'],
    server: STATUS['NON_LOAD'],
  });

  const [time, setTime] = useState({ current: 0, duration: 1 });
  const playerRef = useRef(null);
  const progressRef = useRef(null);

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

  const onNextAudio = useCallback(() => {
    setCurrentAudio({ data: audioList['data'][idx + 1], idx: idx + 1 });
  }, [idx, audioList]);

  const onBackAudio = useCallback(() => {
    setCurrentAudio({ data: audioList['data'][idx - 1], idx: idx - 1 });
  }, [idx, audioList]);

  ///////////
  const onPlayAudio = useCallback(() => {
    switch (status.user) {
      case STATUS['PAUSE']:
        setStatus({
          ...status,
          user: STATUS['PLAYING'],
        });
        break;
      case STATUS['PLAYING']:
        setStatus({
          ...status,
          user: STATUS['PAUSE'],
        });
        break;
      default:
        break;
    }
  }, [status]);

  const onCanPlayAudio = useCallback(() => {
    setTime({
      current: Math.ceil(playerRef.current.currentTime),
      duration: Math.ceil(playerRef.current.duration),
    });
    setStatus({
      ...status,
      server: STATUS['LOADED'],
    });
  }, [status]);

  const onError = useCallback(() => {
    setStatus({
      ...status,
      server: STATUS['ERROR'],
    });
  }, [status]);

  const onAbort = useCallback(() => {
    setStatus({
      ...status,
      server: STATUS['ERROR'],
    });
  }, [status]);

  useEffect(() => {
    const audio = currentAudio['data'];
    if (audio) {
      setStatus({
        server: STATUS['NON_LOAD'],
        user: STATUS['PLAYING'],
      });
    }
  }, [currentAudio]);

  useEffect(() => {
    if (!playerRef.current) return;
    if (status.user === STATUS['PLAYING'] && status.server === STATUS['LOADED']) {
      playerRef.current.play();
      return;
    }
    if (status.user === STATUS['PAUSE']) {
      playerRef.current.pause();
      return;
    }
  }, [status]);

  useEffect(() => {
    if (routeData?.audioId && audioList['data'].length > 0) setCurrentAudio(initCurrentAudio());
  }, [initCurrentAudio, audioList]);

  /////////
  return audio ? (
    <div className="media-player-container">
      <div className="level-left">
        <img src={IconPlaying} />
      </div>
      <div className="level-center">
        <div className="media-action">
          <img src={IconPrevious} className="action__btn" onTouchEnd={onBackAudio} />
          <div className="action__btn btn-wrapper">
            <img
              src={status.user === STATUS['PLAYING'] ? IconPause : IconPlay}
              onTouchEnd={onPlayAudio}
            />
          </div>
          <img src={IconNext} className="action__btn" onTouchEnd={onNextAudio} />
        </div>
        {status.server === STATUS['NON_LOAD'] || status.server === STATUS['ERROR'] ? (
          <div className="media-progress">
            <span className="truncate name">{capitalizeFirstLetter(audio['audioName'])}</span>
          </div>
        ) : (
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
        )}
      </div>
      <div className="level-right">
        <img src={audio['thumb']} />
      </div>
      <audio
        id="media-player"
        ref={playerRef}
        audio-html5-video
        preload="auto"
        src={audio['url']}
        onCanPlay={onCanPlayAudio}
        onTimeUpdate={onTimeUpdateAudio}
        onEnded={onNextAudio}
        onError={onError}
        onAbort={onAbort}
      />
    </div>
  ) : null;
};

export default MediaPlayer;
