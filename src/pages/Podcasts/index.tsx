import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import CollectionComp from './collection-list/collection-list';
import Search from './collection-search';
import AudioComp from './audio-list/audio-list';
import useFetchData from 'srcRoot/Hooks/use-fetch-data';
import { getAllAudio, getThumb } from 'srcRoot/services/Podcasts';
import { AudioList } from 'srcRoot/enitities/Audio';
import MediaPlayer from './media-player';
import './style.scss';

const DEFAULT_AUDIO: AudioList = { data: [], totalRecord: 0,};
const DEFAULT_THUMB = {};

const Podcasts = () => {
  const [searchTxt, setSearchTxt] = useState('');
  const [force, updateForce] = useState(0);
  const payload = useRef({ folderId: '', searchTxt: '', collectionIds:[] });
  const thumbListRef = useRef({});
  const onChangeSearchTxt = useCallback((e) => {
    setSearchTxt(e.target.value);
  }, []);


  const onReloadAudioList = useCallback((params) => {
    payload.current = {...payload.current ,folderId: params.folderId, collectionIds: params.collectionIds };
    console.log('taibnlogs payload.current.folderId', payload.current.folderId);

    updateForce(Math.random());
  }, []);

  const { response: audioList } = useFetchData({
    api: getAllAudio,
    payload: { searchTxt: payload.current.searchTxt, collectionIds: payload.current.collectionIds },
    retryOptions: { retries: 3, retryDelay: 300 },
    forceFetch: force,
  });

  const { response: thumbList } = useFetchData({
    api: getThumb,
    payload: { parent: payload.current.folderId },
    retryOptions: { retries: 3, retryDelay: 300 },
    forceFetch: force,
  });

  thumbListRef.current = useMemo(() => {
    return {...thumbListRef.current, ...thumbList}
  },[thumbList]);


  return (
    <>
    <div className="podcast-container ">
      <Search searchTxt={searchTxt} onChangeSearchTxt={onChangeSearchTxt} />
      <CollectionComp searchTxt={searchTxt} onReloadAudioList={onReloadAudioList} />
      <AudioComp
        audioList={audioList || DEFAULT_AUDIO}
        thumbList={thumbListRef.current || DEFAULT_THUMB}
        onReloadAudioList={onReloadAudioList}
      />

    </div>
        <MediaPlayer/>
    </>
  );
};

export default Podcasts;
