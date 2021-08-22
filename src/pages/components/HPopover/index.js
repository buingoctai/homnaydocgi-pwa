import React, { forwardRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import enhance from './enhance';
import { usePopoverManager } from './hooks';
import PopoverManager from './manager';
import './style.scss';

const PopoverContext = React.createContext();
const PopoverV3 = (props, ref) => {
  const {
    identity,
    visible,
    style = {},
    customStyle = {},
    children,
    container,
    content,
    className = '',
    arrowClassName,
  } = props;

  useEffect(() => {
    if (visible && identity) PopoverManager.handleAfterOpen(identity);
  }, [visible]);

  const bodyHtml = () => {
    return (
      <PopoverContext.Provider
        value={{
          windowId: identity.windowId,
          mountContainer: container,
        }}
      >
        <React.Fragment>
          {ReactDOM.createPortal(
            <div
              ref={ref}
              className={`popover-v3 ${className}`}
              style={{ ...style, ...customStyle }}
            >
              <div className={arrowClassName} />
              {content}
            </div>,
            container
          )}
          {children}
        </React.Fragment>
      </PopoverContext.Provider>
    );
  };

  return visible ? bodyHtml() : children;
};

PopoverV3.prototype = {
  identity: PropTypes.object,
  visible: PropTypes.bool,
  style: PropTypes.object,
  customStyle: PropTypes.object,
  children: PropTypes.node,
  container: PropTypes.node,
  className: PropTypes.string,
  arrowClassName: PropTypes.string,
};

export default enhance(React.memo(forwardRef(PopoverV3)));
export { usePopoverManager, PopoverContext, PopoverManager };
