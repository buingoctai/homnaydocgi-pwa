import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
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
  const [searchTxt, setSearchTxt] = useState('');
  const [force, updateForce] = useState(0);
  const audioParams = useRef({ collectionIds: [] });
  const { response: audioList } = useFetchData({
    api: getAllAudio,
    payload: { collectionIds: audioParams.current.collectionIds },
    retryOptions: { retries: 3, retryDelay: 300 },
    forceFetch: force,
  });

  const onChangeSearchTxt = useCallback((e) => {
    setSearchTxt(e.target.value);
  }, []);

  const onReloadAudioList = useCallback((params) => {
    audioParams.current = { ...audioParams.current, collectionIds: params.collectionIds };
    updateForce(Math.random());
  }, []);

  return (
    <>
      <div className="podcast-container ">
        <Search searchTxt={searchTxt} onChangeSearchTxt={onChangeSearchTxt} />
        <CollectionComp searchTxt={searchTxt} onReloadAudioList={onReloadAudioList} />
        <AudioComp audioList={audioList || DEFAULT_AUDIO} />
      </div>
      <MediaPlayer />
    </>
  );
};

export default Podcasts;
