import React from 'react';
import IconRefesh from 'srcRoot/static/svg/icon-outline-refesh.svg';

interface Props {
  totalRecord: number;
  onReloadAudioList: (params: any, isMock?: boolean) => void;
}
const Title = (props: Props) => {
  const { totalRecord, onReloadAudioList } = props;

  return (
    <>
      <div className="title-wrap">
        <span>{`Tất Cả: ${totalRecord}`}</span>
        <img src={IconRefesh} width={24} height={24} onClick={onReloadAudioList} />
      </div>
    </>
  );
};

export default Title;
