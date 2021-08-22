import React, { useEffect, useState, useRef } from 'react';
import PopoverManagerV3 from '../manager';

const useEventListener = (eventName, handler, root = window, capture = true, popStatus) => {
  const savedHandler = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = root && root.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    if (popStatus) {
      root.removeEventListener(eventName, eventListener, capture); // handle tempory
      root.addEventListener(eventName, eventListener, capture);
    } else {
      root.removeEventListener(eventName, eventListener, capture);
    }
  }, [eventName, root, popStatus]);
};

const throwPopoverError = (name) => {
  console.log('Popover error: undefined name');
};

const usePopoverManager = ({ windowId = null, name = null }) => {
  const [, update] = useState(0);
  useEffect(() => {
    const trigger = () => {
      update(Math.random());
    };
    if (windowId && name) {
      PopoverManagerV3.addPopover({ windowId, name });
      PopoverManagerV3.subscribeTriggers({ windowId, name, trigger });
    }
    return () => {
      if (windowId && name) PopoverManagerV3.delPopover({ windowId, name });
    };
  }, [name]);

  return {
    isVisible: ({ windowId, name }) => {
      if (!name) throwPopoverError(name);
      return PopoverManagerV3.isVisible({ windowId, name });
    },
    openPopover: ({ windowId, name }) => {
      if (!name) throwPopoverError(name);
      return PopoverManagerV3.openPopover({ windowId, name });
    },
    closePopover: ({ windowId, name }) => {
      if (!name) throwPopoverError(name);
      return PopoverManagerV3.closePopover({ windowId, name });
    },
    closeAllPopover: (windowList) => {
      return PopoverManagerV3.closeAllPopover(windowList);
    },
    getAnchorEvent: ({ windowId, name }) => {
      if (!name) throwPopoverError(name);
      return PopoverManagerV3.getAnchorEvent({ windowId, name });
    },
    addHandler: ({ windowId, handlerName, handler }) => {
      if (!windowId) throwPopoverError(windowId);

      return PopoverManagerV3.addHandler({ windowId, handlerName, handler });
    },
    removeHandler: ({ windowId, handlerName }) => {
      if (!windowId) throwPopoverError(windowId);

      return PopoverManagerV3.removeHandler({ windowId, handlerName });
    },
  };
};
export { useEventListener, usePopoverManager };
