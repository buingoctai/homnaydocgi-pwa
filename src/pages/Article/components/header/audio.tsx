import React, { useCallback, useEffect, useState } from 'react';
import IconSound from 'srcRoot/static/svg/icon-outline-podcast.svg';
import IconMute from 'srcRoot/static/svg/icon-outline-sound-mute.svg';
import { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import { useRecoilState } from 'recoil';
import { popupGlobalState } from 'srcRoot/recoil/appState';

interface Props {
  onText2Speech: () => any;
}
interface Audio {
  id: string | null;
  name: string | null;
  url: string | null;
}
const Audio = (props: Props) => {
  const { onText2Speech } = props;
  const [isListening, setIsListening] = useState(false);
  const [audio, setAudio] = useState<Audio>({ id: null, name: null, url: null });
  const [popupGlobal, setPopupGlobal] = useRecoilState(popupGlobalState);

  const openAudio = useCallback(async () => {
    setPopupGlobal({
      title: 'Tính năng thử nghiệm',
      message: 'Chuyển văn bản sang âm thanh',
      timeout: 4000,
    });
    PopoverManager.openPopover(PopupIdentities['NOTI_GLOBAL']);

    setIsListening(true);

    onText2Speech()
      .then((res: Audio) => {
        setAudio(res);
      })
      .catch(() => {
        setIsListening(false);
      });
  }, []);

  const closeAudio = useCallback(() => {
    setIsListening(false);
  }, []);

  return isListening ? (
    <div className="audio-wrap active" onClick={closeAudio}>
      <img src={IconSound} width={30} height={30} className={audio.url ? 'loaded' : ''} />
      <audio autoPlay={true} src={audio.url} onEnded={closeAudio}></audio>
    </div>
  ) : (
    <div className="audio-wrap" onClick={openAudio}>
      <img src={IconMute} width={30} height={30} />
    </div>
  );
};

export default Audio;
