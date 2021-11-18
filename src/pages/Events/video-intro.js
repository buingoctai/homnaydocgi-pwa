import React from 'react';
import MyLove from './mylove.jpg';

const VideoIntro = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <img src={MyLove} width="140" height="216" style={{ margin: 'auto' }} />

      <audio
        id="player"
        controls="controls"
        autoplay
        style={{ margin: 'auto', marginTop: '10px', marginBottom: '10px' }}
      >
        <source
          src="https://docs.google.com/uc?export=download&id=1VCdXwwftJ-0QSESOXf5ibcsNz_Mjp65P"
          type="audio/mp3"
        />
      </audio>
    </div>
  );
};

export default VideoIntro;
