const AFTER_OPEN = 'afterOpen';
const BEFORE_CLOSE = 'beforeClose';
const AFTER_ADD = 'afterAdd';

const ALLOWED_EVENTS = [AFTER_OPEN, BEFORE_CLOSE, AFTER_ADD];

const ALLOWED_HANDLERS = ['mousedown', 'keydown'];
const WHILTE_LIST_AFTER_ADD_EVENT = [];

export class PopoverManagerV3 {
  constructor() {
    this.popover = {};
    this.opens = {};
    this.triggers = {};
    this.callbacks = {
      // afterOpen: [],
      // beforeClose: [],
      // afterAdd: [],
    };
    this.eventHandlers = {};
    this.lastOpen = null;
    this.lastClose = null;
  }

  addPopover({ windowId, name }) {
    const popover = this.getPopoverByName({ windowId, name });
    if (popover) return;

    const popoverList = this.popover[windowId] || [];
    popoverList.push({ name });
    this.popover[windowId] = [...popoverList];
  }

  isVisible({ windowId, name }) {
    return this.isOpenByName({ windowId, name });
  }

  openPopover({ windowId, name, anchorEvent = null, params = null, onAfterOpen }) {
    const popover = this.getPopoverByName({ windowId, name });
    if (!popover) {
      console.error(`[Popover-V3] Manager don't have  ${name} popover`);
      return;
    }
    const savedAnchorData = anchorEvent
      ? {
          currentTarget: anchorEvent.currentTarget,
          target: anchorEvent.target,
          pageX: anchorEvent.pageX,
          pageY: anchorEvent.pageY,
          type: anchorEvent.type,
        }
      : this.isVisible({ windowId, name })
      ? this.getAnchorEvent({ windowId, name })
      : null;

    let openList = this.opens[windowId] || [];
    openList = this.pushInObjectList(openList, {
      name,
      anchorEvent: savedAnchorData,
      onAfterOpen,
    });
    this.opens[windowId] = [...openList];
    this.lastOpen = { windowId, name };
    this.runTrigger({ windowId, name, params });
  }

  closePopover({ windowId, name, params = null }) {
    const popover = this.getPopoverByName({ windowId, name });
    const isVisible = this.isOpenByName({ windowId, name });
    if (!popover) {
      console.error(`[Popover-V3] Manager don't have  ${name} popover.`);
      return;
    }
    if (!isVisible) return;

    this.lastClose = { windowId, name };
    this.emit(BEFORE_CLOSE, this.lastClose);
    let openList = this.opens[windowId] || [];
    openList = openList.filter((p) => p.name !== name);
    this.opens[windowId] = [...openList];
    this.runTrigger({ windowId, name, params });
  }

  closeAllPopover(list) {
    const windowList = list || Object.keys(this.opens);
    for (let i = 0; i < windowList.length; i++) {
      const openList = this.opens[windowList[i]];
      if (!openList) continue;

      for (let j = 0; j < openList.length; j++) {
        this.closePopover({ windowId: windowList[i], name: openList[j].name });
      }
    }
  }

  delPopover({ windowId, name }) {
    const popoverList = this.popover[windowId];
    const openList = this.opens[windowId];
    const triggerList = this.triggers[windowId];
    if (!popoverList) return;

    this.popover[windowId] = popoverList.filter((p) => p.name !== name);
    this.opens[windowId] = Boolean(openList) && openList.filter((p) => p.name !== name);
    this.triggers[windowId] = Boolean(triggerList) && triggerList.filter((p) => p.name !== name);
  }

  subscribeTriggers({ windowId, name, trigger }) {
    const popover = this.getPopoverByName({ windowId, name });
    if (!popover) {
      console.error(`[Popover-V3] Manager don't have ${name} popover.`);
      return;
    }

    let triggerList = this.triggers[windowId] || [];
    triggerList = this.pushInObjectList(triggerList, { name, trigger });
    this.triggers[windowId] = [...triggerList];
    /* ----------------------PROCESSING AFTER ADD EVENT--------------------
    - SOME POPUP ARE NOT PROPERLY WITH NEW FLOW POPUP. 
    - NEED PRODVIDE THEM IN WHILTE LIST
    - PREVENT CALL EMIT EVENT ALWAYS 
    */
    if (WHILTE_LIST_AFTER_ADD_EVENT.includes(name)) {
      this.emit(AFTER_ADD, { windowId, name });
      this.removeListener(AFTER_ADD, { windowId, name });
    }
    /*---------------------------------------------------------------------*/
  }

  updateCallbackStatus(eventName, payload) {
    if (!eventName || !payload || !payload.windowId || !payload.name) return;
    const { windowId, name } = payload;
    if (!this.callbacks[windowId]) return;

    switch (eventName) {
      case AFTER_OPEN:
        this.callbacks[windowId][AFTER_OPEN] = (this.callbacks[windowId][AFTER_OPEN] || []).map(
          (c) => {
            if (c.name === name) {
              return { ...c, called: true };
            }
            return { ...c };
          }
        );
        this.callbacks[windowId][BEFORE_CLOSE] = (this.callbacks[windowId][BEFORE_CLOSE] || []).map(
          (c) => {
            if (c.name === name) {
              return { ...c, called: false };
            }
            return { ...c };
          }
        );
        break;
      case BEFORE_CLOSE:
        this.callbacks[windowId][BEFORE_CLOSE] = (this.callbacks[windowId][BEFORE_CLOSE] || []).map(
          (c) => {
            if (c.name === name) {
              return { ...c, called: false };
            }
            return { ...c };
          }
        );
        this.callbacks[windowId][AFTER_OPEN] = (this.callbacks[windowId][AFTER_OPEN] || []).map(
          (c) => {
            if (c.name === name) {
              return { ...c, called: false };
            }
            return { ...c };
          }
        );
        break;
      default:
        break;
    }
  }

  emit(eventName, payload) {
    if (!payload || !payload.windowId || !payload.name || this.isSkipEmit(eventName, payload))
      return;

    const { windowId, name } = payload;
    const existWindow = this.callbacks[windowId];
    if (!existWindow) return;

    const callbackList = this.callbacks[windowId][eventName] || [];
    const callback = callbackList.filter((c) => c.name === name);

    callback.forEach((cb) => {
      if (cb.callback && !cb.called) {
        cb.callback();
      }
    });
  }
  on(eventName, identity, callback) {
    if (!ALLOWED_EVENTS.includes(eventName)) {
      console.error(`[Popover-V3] Manager don't support ${eventName} event.`);
      return;
    }
    if ((!identity && !(typeof identity === 'object')) || !identity.name || !identity.windowId) {
      console.error(`[Popover-V3][On] Please provide a full identity of ${eventName} listener .`);
      return;
    }

    this.callbacks[identity.windowId] = this.callbacks[identity.windowId] || {};
    const callbackList = this.callbacks[identity.windowId][eventName] || [];
    this.callbacks[identity.windowId][eventName] = [
      ...callbackList,
      { name: identity.name, callback, called: false },
    ];
  }

  removeListener(eventName, identity, callback) {
    const existWindow = this.callbacks[identity.windowId];

    if (!ALLOWED_EVENTS.includes(eventName)) {
      console.error(`[Popover-V3] Manager don't support ${eventName} event.`);
      return;
    }
    if ((!identity && !(typeof identity === 'object')) || !identity.name || !identity.windowId) {
      console.error(
        `[Popover-V3][RemoveListener] Please provide a full identity of ${eventName} listener .`
      );
      return;
    }
    if (!existWindow) {
      console.error(`[Popover-V3] Manager can't remove listener on non existing window`);
      return;
    }

    const callbackList = this.callbacks[identity.windowId][eventName] || [];
    this.callbacks[identity.windowId][eventName] = callbackList.filter(
      (c) => c.name !== identity.name
    );
  }

  getAnchorEvent({ windowId, name }) {
    const popover = this.getPopoverByName({ windowId, name });
    if (!popover) {
      console.error(`[Popover-V3] Manager don't have ${name} popover.`);
      return null;
    }

    const openList = this.opens[windowId];
    const openPopover = openList.find((p) => p.name === name);
    return openPopover?.anchorEvent || null;
  }

  getPopoverByName({ windowId, name }) {
    const existWindow = this.popover[windowId];

    if (existWindow) {
      return existWindow.find((p) => p.name === name);
    } else {
      return false;
    }
  }

  isOpenByName({ windowId, name }) {
    const openWindow = this.opens[windowId];

    if (openWindow) {
      return Boolean(openWindow.find((p) => p.name === name));
    } else {
      return false;
    }
  }

  runTrigger({ windowId, name, params }) {
    const existTrigger = this.triggers[windowId];

    if (existTrigger) {
      const p = existTrigger.find((p) => p.name === name);
      if (p) p.trigger(params);
    } else {
      console.error(`[Popover-V3] The trigger wasn't subscribed for the ${name} popover.`);
      return;
    }
  }

  handleAfterOpen({ windowId, name }) {
    const popover = this.getPopoverByName({ windowId, name });
    if (!popover) {
      console.error(`[Popover-V3] Manager don't have ${name} popover.`);
      return;
    }

    const openList = this.opens[windowId];
    const openPopover = openList.find((p) => p.name === name);
    const handler = openPopover?.onAfterOpen;
    if (handler) handler();
  }

  // ----------------- tempory
  addHandler({ windowId, handlerName, handler }) {
    if (!ALLOWED_HANDLERS.includes(handlerName)) {
      console.error(`[Popover-V3] Manager don't support handler for ${handlerName} event.`);
      return;
    }

    // Duy nhất tồn tại 1 handler với 1 event type
    this.eventHandlers[windowId] = this.eventHandlers[windowId] || {};
    if (!this.eventHandlers[windowId][handlerName]) {
      this.eventHandlers[windowId][handlerName] = handler;
    }
  }

  removeHandler({ windowId, handlerName }) {
    if (!this.eventHandlers[windowId] || !this.eventHandlers[windowId][handlerName]) {
      `[Popover-V3] The ${handlerName} handler is not subscribed for window with id: ${windowId} to remove.`;
    }

    this.x[windowId][handlerName] = null;
  }

  handleMouseDown(event, windowId) {
    if (!this.eventHandlers[windowId] || !this.eventHandlers[windowId]['mousedown']) {
      `[Popover-V3] The mousedown handler is not subscribed for window with id: ${windowId}`;
    }
    const handler = this.eventHandlers[windowId]['mousedown'];

    handler(event);
  }
  /* utils */
  pushInObjectList(list, newP) {
    let newList = list;

    newList = newList.filter((p) => p.name !== newP.name);
    newList.push(newP);

    return newList;
  }

  pushInCallbackList(list, newCallback) {
    let newList = list;

    newList = newList.filter((c) => c.toString() !== newCallback.toString());
    newList.push(newCallback);

    return newList;
  }

  isSkipEmit(eventName, identity) {
    if (eventName === BEFORE_CLOSE) return !this.isVisible(identity);
    return false;
  }
}

const popoverManagerV3 = new PopoverManagerV3();
export default popoverManagerV3;
