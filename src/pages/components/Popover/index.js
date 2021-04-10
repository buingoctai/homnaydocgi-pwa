import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const defaultPopoverRoot = document.getElementById('popover-root');
const Popover = (props) => {
  return ReactDOM.createPortal(
    <div style={{ ...props.newStyle }} className="container">
      {props.child}
    </div>
  ,defaultPopoverRoot);
};
export default Popover;
