import React, { useState, useCallback, useRef, useEffect } from 'react';
import CollectionComp from './collection-list/collection-list';
import Search from './collection-search';
import AudioComp from './audio-list/audio-list';
import useFetchData from 'srcRoot/Hooks/use-fetch-data';
import { getAllAudio } from 'srcRoot/services/Podcasts';
import { AudioList } from 'srcRoot/enitities/Audio';
import MediaPlayer from './media-player';

import './style.scss';

const DEFAULT_AUDIO: AudioList = { data: [], totalRecord: 0 };

const Podcasts = () => {
  const [searchTxt, setSearchTxt] = useState({ text: '' });
  const [force, updateForce] = useState(0);
  const audioParams = useRef({ collectionIds: [] });
  const { response: audioList, setResponse: setAudioList } = useFetchData({
    api: getAllAudio,
    payload: { collectionIds: audioParams.current.collectionIds },
    retryOptions: { retries: 3, retryDelay: 300 },
    forceFetch: force,
  });

  const onChangeSearchTxt = useCallback((e) => {
    setSearchTxt({ text: e?.target?.value || '' });
  }, []);

  const onReloadAudioList = useCallback(
    (params, isMockRes) => {
      if (isMockRes) {
        const appendMock = {
          data: [{ isMock: true }, ...audioList['data']],
          totalRecord: audioList['totalRecord'] + 1,
        };
        setAudioList(appendMock);

        return;
      }
      if (params) {
        audioParams.current = { ...audioParams.current, collectionIds: params.collectionIds };
      }
      updateForce(Math.random());
    },
    [audioList]
  );

  return (
    <>
      <div className="podcast-container ">
        <Search searchTxt={searchTxt} onChangeSearchTxt={onChangeSearchTxt} />
        <CollectionComp searchTxt={searchTxt} onReloadAudioList={onReloadAudioList} />
        <AudioComp audioList={audioList || DEFAULT_AUDIO} onReloadAudioList={onChangeSearchTxt} />
      </div>
      <MediaPlayer audioList={audioList || DEFAULT_AUDIO} />
    </>
  );
};

export default Podcasts;
