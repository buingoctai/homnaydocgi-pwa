import React, { useRef } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import PodcastItem from './audio-item';
import Title from './audio-list-title';
import { AudioList } from 'srcRoot/enitities/Audio';
import SkeletonItem from './skeleton-audio-item';
interface Props {
  audioList: AudioList | object;
  onReloadAudioList: (params: any, isMock?: boolean) => void;
}

const PodcastList = (props: Props) => {
  const { audioList, onReloadAudioList } = props;

  return (
    <div className="podcast-list">
      <Title totalRecord={audioList['totalRecord']} onReloadAudioList={onReloadAudioList} />
      {/* {isLoading && <SkeletonItem />} */}

      <div className="list-wrap" id="audio-list">
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                rowHeight={72}
                rowRenderer={({ index, key, style }) => {
                  if (audioList['data'][index].isMock) {
                    return (
                      <div>
                        <SkeletonItem />
                      </div>
                    );
                  }
                  return (
                    <PodcastItem
                      index={index}
                      key={key}
                      style={style}
                      data={audioList['data'][index]}
                    />
                  );
                }}
                rowCount={audioList['data'].length}
              />
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default PodcastList;
