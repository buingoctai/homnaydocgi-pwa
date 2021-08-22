import React, { useRef, useContext, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  getStyle,
  addArrowClassName,
  isDomNode,
  adjustPlacement,
  isEffectInPopover,
  comparePlacements,
} from './utils';
import { EVENTS, KEY_CODES, PLACEMENTS } from './utils/constants';
import { useEventListener, usePopoverManager } from './hooks';
import PopoverManagerV3 from './manager';

const DEFAULT_CONTEXT = {
  window: window,
  container: window.document.body,
};

const enhance = (PopoverV3) => (props) => {
  const {
    identity,
    placement = PLACEMENTS['BOTTOM-LEFT'],
    trigger,
    children,
    content,
    anchorEl,
    affectWindow: _affectWindow,
    fixedPosition,
    deltaPosition,
    isArrow,
    style: customStyle,
    mountContainer,
    selfContext: _selfContext,
    className,
    dropdown,
    subPopClassName = '',
  } = props;

  if (!identity || !identity.windowId || !identity.name) {
    console.error('[Popover-V3] Please provide a full identity of popover');
    return null;
  }
  const selfContext = _selfContext;
  const windowContext = useMemo(() => {
    return selfContext
      ? { window: selfContext.window, container: selfContext.document.body }
      : DEFAULT_CONTEXT;
  }, [selfContext]);

  const affectWindow = Array.isArray(_affectWindow) ? _affectWindow : [identity.windowId];
  const newStyle = useRef({ top: 0, left: 0 });
  const source = useRef({ target: null, event: null });
  const refPopover = useRef(null);
  const {
    isVisible,
    openPopover,
    closeAllPopover,
    closePopover,
    getAnchorEvent,
  } = usePopoverManager(identity);

  const attachEventListeners = () => {
    let eventListeners = {};

    switch (trigger) {
      case EVENTS.CLICK:
        eventListeners.onMouseDown = (event) => {
          event.preventDefault();
          event.stopPropagation();
          source.current = {
            ...source.current,
            target: event.currentTarget,
            event,
          };
          newStyle.current = getStyle(
            source.current,
            trigger,
            placement,
            deltaPosition,
            windowContext
          );

          openPopover({ windowId: identity.windowId, name: identity.name });
        };
        break;
      case EVENTS.HOVER:
        eventListeners.onMouseEnter = (event) => {
          event.preventDefault();
          event.stopPropagation();
          source.current = {
            ...source.current,
            target: event.currentTarget,
            event,
          };
          newStyle.current = getStyle(
            source.current,
            trigger,
            placement,
            deltaPosition,
            windowContext
          );

          openPopover({ windowId: identity.windowId, name: identity.name });
        };
        break;
      case EVENTS.CONTEXT_MENU:
        eventListeners.onContextMenu = (event) => {
          event.preventDefault();
          event.stopPropagation();
          source.current = {
            ...source.current,
            target: event.currentTarget,
            event,
          };
          newStyle.current = getStyle(
            source.current,
            trigger,
            placement,
            deltaPosition,
            windowContext
          );

          openPopover({ windowId: identity.windowId, name: identity.name });
        };
        break;
      default:
        eventListeners.onMouseDown = (event) => {
          event.preventDefault();
          event.stopPropagation();
          source.current = {
            ...source.current,
            target: event.currentTarget,
            event,
          };
          newStyle.current = getStyle(
            source.current,
            trigger,
            placement,
            deltaPosition,
            windowContext
          );

          openPopover({ windowId: identity.windowId, name: identity.name });
        };
        break;
    }
    return eventListeners;
  };

  const mouseDownHandler = useCallback((event) => {
    if (refPopover.current) {
      let isClickInSide = false;

      if (refPopover.current.contains(event.target)) isClickInSide = true;
      if (event.clientX || event.clientY) {
        isClickInSide = isEffectInPopover(
          event.clientX,
          event.clientY,
          refPopover.current,
          subPopClassName
        );
      }
      if (!isClickInSide) closePopover(identity);
    }
  }, []);
  // const resizeHandler = useCallback((event) => {}, []);

  const keydownHandler = useCallback((event) => {
    if (event.keyCode === KEY_CODES.ESC) {
      event.stopPropagation();
      event.preventDefault();
      closeAllPopover(affectWindow);
    }
  }, []);

  const forceStyleDomNode = (element, data = {}, reset = false) => {
    if (!isDomNode(element)) {
      console.error('[Popover-V3] Cannot force update element is not dom node!');
      return;
    }
    for (const [key, value] of Object.entries(data)) {
      element.style[key] = reset || key === 'transform' ? value : `${value}px`;
    }
  };

  const forceStylePopup = useCallback(
    (reactElement) => {
      forceStyleDomNode(
        reactElement,
        {
          left: null,
          top: null,
          right: null,
          bottom: null,
          transform: null,
        },
        true
      );
      forceStyleDomNode(reactElement, { ...newStyle.current });
    },
    [newStyle.current]
  );

  const getNewStyle = useCallback(
    (placement, deltaPosition) => {
      return (
        fixedPosition ||
        getStyle(
          {
            target: source.current.target,
            event: source.current.event,
          },
          trigger,
          placement,
          deltaPosition,
          windowContext
        )
      );
    },
    [fixedPosition, source, trigger, windowContext]
  );

  const renderChildren = () => {
    if (!children) return null;

    const { onMouseDown, ...restProps } = children;
    return React.cloneElement(children, {
      ref: (reactElement) => didMountChild(reactElement),
      ...restProps,
      ...attachEventListeners(),
    });
  };

  const didMountChild = (reactElement) => {
    if (!reactElement) return;
    // const childNode = ReactDOM.findDOMNode(reactElement);
    // source.current = {
    //   ...source.current,
    //   target: childNode,
    // };
  };

  const didMountPopover = useCallback(
    (reactElement) => {
      if (!source.current.target && !source.current.event) {
        console.warn('[Popover-V3] AnchorEl & AnchorEvent are both invalid.');
      }

      const contextPop =
        trigger == EVENTS['CONTEXT_MENU'] || source.current.event?.type === 'contextmenu'; // native vaue from event;
      let adjustConfig = {
        placement: '',
        deltaPosition: { top: 0, left: 0 },
        exceed: { top: 0, left: 0 },
        height: 0,
      };
      let newPlacement = placement;
      let newDeltaPosition = deltaPosition;
      let exceed = { top: 0, left: 0 };
      let newHeight = 0;

      refPopover.current = reactElement;
      if (refPopover.current) {
        adjustConfig = adjustPlacement(
          refPopover.current,
          placement,
          deltaPosition,
          windowContext,
          contextPop
        );
        newPlacement = adjustConfig.placement;
        newDeltaPosition = adjustConfig.deltaPosition;
        exceed = adjustConfig.exceed;
        newHeight = adjustConfig.height;

        if (contextPop) {
          newStyle.current = getNewStyle(newPlacement, newDeltaPosition);
          forceStylePopup(reactElement);
          //////////////// REVERT TO INIT DELTAPOSITION
          let { top: newDeltaTop, left: newDeltaLeft } = newDeltaPosition;

          adjustConfig = adjustPlacement(
            refPopover.current,
            newPlacement,
            newDeltaPosition,
            windowContext,
            contextPop
          );
          if (
            newDeltaPosition.top === -adjustConfig.deltaPosition.top &&
            newDeltaPosition.top !== 0
          )
            newDeltaTop = exceed.top;
          if (
            newDeltaPosition.left === -adjustConfig.deltaPosition.left &&
            newDeltaPosition.left !== 0
          )
            exceed.left;
          newDeltaPosition = { top: newDeltaTop, left: newDeltaLeft };
          newStyle.current = getNewStyle(newPlacement, newDeltaPosition);
          forceStylePopup(reactElement);
          ///////////////////////////////////////////
        }
        if (!contextPop && newPlacement !== placement) {
          if (dropdown)
            newStyle.current = { ...newStyle.current, ...customStyle, height: newHeight };
          else newStyle.current = getNewStyle(newPlacement, newDeltaPosition);

          forceStylePopup(reactElement);
          ////////////////////REVERT TO INIT PLACEMENT
          if (!dropdown) {
            adjustConfig = adjustPlacement(
              refPopover.current,
              newPlacement,
              newDeltaPosition,
              windowContext,
              contextPop
            );

            if (
              adjustConfig.placement !== newPlacement &&
              comparePlacements(adjustConfig.placement, placement)
            ) {
              newPlacement = placement;
              newDeltaPosition = exceed;

              newStyle.current = getNewStyle(newPlacement, newDeltaPosition);
              forceStylePopup(reactElement);
            }
          }
          //////////////////////////////////
        }

        reactElement.style.opacity = 1;
        PopoverManagerV3.emit('afterOpen', PopoverManagerV3.lastOpen);
        PopoverManagerV3.updateCallbackStatus('afterOpen', PopoverManagerV3.lastOpen);
      } else {
        if (PopoverManagerV3.lastClose && !PopoverManagerV3.isVisible(identity)) {
          PopoverManagerV3.updateCallbackStatus('beforeClose', PopoverManagerV3.lastClose);
        }
      }
    },
    [refPopover.current]
  );

  const anchorEvent = isVisible(identity) ? getAnchorEvent(identity) : null;
  const visible = isVisible(identity) && Boolean(content);
  newStyle.current = useMemo(() => {
    if ((anchorEl || anchorEvent) && !children) {
      const target = anchorEl || anchorEvent.currentTarget || anchorEvent.target;

      source.current = {
        ...source.current,
        target: target,
        event: anchorEvent,
      };

      return getStyle(
        {
          target: source.current.target,
          event: source.current.event,
        },
        trigger,
        placement,
        deltaPosition,
        windowContext
      );
    }
  }, [anchorEl, anchorEvent, children, placement, deltaPosition, visible]);
  if (fixedPosition) newStyle.current = fixedPosition;

  useEventListener('mousedown', mouseDownHandler, windowContext.window, true, isVisible(identity));
  // useEventListener('resize', resizeHandler);
  useEventListener('keydown', keydownHandler, windowContext.window, false, isVisible(identity));

  return (
    <PopoverV3
      identity={identity}
      visible={visible}
      style={newStyle.current}
      customStyle={customStyle}
      container={
        isDomNode(mountContainer)
          ? mountContainer || useContext(ModalV2Context)?.mountContainer
          : windowContext.container
      }
      content={content}
      ref={(reactElement) => didMountPopover(reactElement)}
      className={className}
      arrowClassName={addArrowClassName(isArrow, placement)}
    >
      {renderChildren()}
    </PopoverV3>
  );
};

enhance.prototype = {
  windowId: PropTypes.string,
  name: PropTypes.string,
  visible: PropTypes.bool,
  placement: PropTypes.string,
  trigger: PropTypes.oneOf(['hover', 'click', 'contextMenu']),
  affectWindow: PropTypes.array,
  fixedPosition: PropTypes.object,
  deltaPosition: PropTypes.object,
  dropdown: PropTypes.string,
  subPopClassName: PropTypes.string,
};

export default enhance;
