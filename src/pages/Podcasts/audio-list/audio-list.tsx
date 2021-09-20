import React from 'react';
import { List, AutoSizer } from 'react-virtualized';
import PodcastItem from './audio-item';
import Title from './audio-list-title';
import { AudioList } from 'srcRoot/enitities/Audio';

interface Props {
  audioList: AudioList | object;
  thumbList: object;
  onReloadAudioList: (params: any) => void;
}


const PodcastList = (props: Props) => {
  const { audioList, thumbList, onReloadAudioList } = props;



  return (
    <div className="podcast-list">
      <Title
        totalRecord={audioList['totalRecord']}
        collectionId={audioList['id']} // khong con field này với api mới
        onReloadAudioList={onReloadAudioList}
      />

      <div className="list-wrap">
        <AutoSizer>
          {({ width, height }) => {
            console.log(width, height);

            return (
              <List
                width={width}
                height={height}
                rowHeight={72}
                rowRenderer={({ index, key, style }) => {
                  return (
                    <PodcastItem
                      index={index}
                      key={key}
                      style={style}
                      thumb={thumbList[audioList['data'][index].audioId]}
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
