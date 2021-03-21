import React from 'react';

import './style.scss';

const Popover = (props) => {
  return (
    <div style={{ ...props.newStyle }} className="container">
      {props.child}
    </div>
  );
};
export default Popover;
