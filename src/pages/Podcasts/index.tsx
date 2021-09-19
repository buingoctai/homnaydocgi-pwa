import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import CollectionList from './collection-list';
import Search from './collection-search';
import PodcastList from './podcast-list';
import useFetchData from 'srcRoot/Hooks/use-fetch-data';
import { getAllBook, getCurrentBook, getThumb } from 'srcRoot/services/Podcasts';
import { AudioList } from 'srcRoot/enitities/Audio';

import './style.scss';

const DEFAULT_AUDIO: AudioList = { data: [], totalRecord: 0, id: '' };
const DEFAULT_THUMB = {};

const Podcasts = () => {
  const [searchTxt, setSearchTxt] = useState('');
  const [force, updateForce] = useState(0);
  const payload = useRef({ folderId: '' });
  const onChangeSearchTxt = useCallback((e) => {
    setSearchTxt(e.target.value);
  }, []);

  const onReloadAudioList = useCallback((params) => {
    payload.current = { folderId: params.folderId };
    console.log('taibnlogs payload.current.folderId', payload.current.folderId);

    updateForce(Math.random());
  }, []);

  const { response: audioList } = useFetchData({
    api: getCurrentBook,
    payload: { id: payload.current.folderId },
    retryOptions: { retries: 3, retryDelay: 300 },
    forceFetch: force,
  });

  const { response: thumbList } = useFetchData({
    api: getThumb,
    payload: { parent: payload.current.folderId },
    retryOptions: { retries: 3, retryDelay: 300 },
    forceFetch: force,
  });

  return (
    <div className="podcast-container ">
      <Search searchTxt={searchTxt} onChangeSearchTxt={onChangeSearchTxt} />
      <CollectionList searchTxt={searchTxt} onReloadAudioList={onReloadAudioList} />
      <PodcastList
        audioList={audioList || DEFAULT_AUDIO}
        thumbList={thumbList || DEFAULT_THUMB}
        onReloadAudioList={onReloadAudioList}
      />
    </div>
  );
};

export default Podcasts;
