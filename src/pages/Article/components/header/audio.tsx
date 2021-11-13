import React, { useCallback, useEffect, useState } from 'react';
import IconSound from 'srcRoot/static/svg/icon-outline-podcast.svg';
import IconMute from 'srcRoot/static/svg/icon-outline-sound-mute.svg';
import { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import { useRecoilState } from 'recoil';
import { popupGlobalState } from 'srcRoot/recoil/appState';
import { Audio } from 'srcRoot/enitities/Audio';
interface Props {
  onText2Speech: () => any;
}

const Audio = (props: Props) => {
  const { onText2Speech } = props;
  const [isListening, setIsListening] = useState(false);
  const [audio, setAudio] = useState<Audio>({ audioName: '', audioId: '', url: null, thumb: null });
  const [popupGlobal, setPopupGlobal] = useRecoilState(popupGlobalState);

  const openAudio = useCallback(async () => {
    setPopupGlobal({
      isOpening: true,
      title: 'Tính năng thử nghiệm',
      message: 'Chuyển văn bản sang âm thanh',
      timeout: 4000,
    });

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

  useEffect(() => {
    if (popupGlobal.isOpening) PopoverManager.openPopover(PopupIdentities['NOTI_GLOBAL']);
  }, [popupGlobal]);

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
