import React, { useCallback } from 'react';
import IconSound from 'srcRoot/static/svg/icon-outline-podcast.svg';
import { ToastManager, TOAST_TYPE } from 'srcRoot/components/Toast';
import { Audio } from 'srcRoot/enitities/Audio';
import { useHistory } from 'react-router-dom';
import { TRANSITION_TIME_PAGE } from 'srcRoot/app-config';

interface Props {
  onText2Speech: () => any;
}

const Audio = (props: Props) => {
  const { onText2Speech } = props;
  const history = useHistory();

  const openAudio = useCallback(() => {
    ToastManager.show({
      text: 'Đang Chuyển Văn Bản Sang Âm Thanh.',
      type: TOAST_TYPE.INFO,
      noBackground: true,
      duration: 5000,
    });

    onText2Speech()
      .then((res: { id: string; name: string; url: string }) => {
        setTimeout(() => {
          history.push({ pathname: '/podcasts', state: { audioId: res.id } });
        }, TRANSITION_TIME_PAGE);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="audio-wrap active" onClick={openAudio}>
      <img src={IconSound} width={30} height={30} className={'loaded'} />
    </div>
  );
};

export default Audio;
