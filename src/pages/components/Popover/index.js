import React, {forwardRef} from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const defaultPopoverRoot = document.getElementById('popover-root');
const Popover = (props,ref) => {
  return ReactDOM.createPortal(
    <div style={{ ...props.newStyle }} className="container" ref={ref}>
      {props.child}
    </div>
  ,defaultPopoverRoot);
};
export default forwardRef(Popover);
