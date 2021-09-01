import React, { useState, useEffect, useCallback, useRef } from 'react';
import Me from './me.jpg';

const Title = (props) => {
  return (
    <div className="title-wrap">
      <div className="title__intro">
        <span>Người anh yêu</span>
        <span>Mong sớm gặp lại nhau <div className="heart"> </div></span>
      </div>
      <div className="btn__install">
        <img src={Me} height={50} width={50} alt="rose flower"/>
      </div>
    </div>
  );
};

export default Title;
