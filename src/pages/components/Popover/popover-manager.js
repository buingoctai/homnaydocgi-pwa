import ReactDOM from 'react-dom';
import React from 'react';
import Popover from './index';

class PopoverManager {
  constructor() {
    this.dispatch = null;
    this.deferredPrompt = null;
  }

  bindDispatch(func) {
    this.dispatch = func;
  }

  saveDeferredPrompt(value) {
    this.deferredPrompt = value;
  }
  open(child, style) {
    this.dispatch({ data: { child, style }, isOpen: true });
  }
  close() {
    this.dispatch({ data: null, isOpen: false });
    this.deferredPrompt.current = null;
  }
}

const popoverManager = new PopoverManager();

export default popoverManager;
