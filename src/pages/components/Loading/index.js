import React from 'react';
import './style.scss';

const Loading = (props) => {
  return (
    <div class={`spinner ${props.className}`}>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  );
};

export default Loading;
