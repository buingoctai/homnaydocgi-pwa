import ReactDOM from 'react-dom';
import React from 'react';
import Popover from './index';

class PopoverManager {
  constructor() {
    this.dispatch = null;
    this.deferredPrompt= null;
  }

  bindDispatch(func) {
    this.dispatch = func;
  }
  
  saveDeferredPrompt(value){
    this.deferredPrompt = value;
  }
  open(child, style) {
    this.dispatch({ payload: { data: { child, style } }, type: 'OPEN_POPOVER' });
  }
  close() {
    this.dispatch({ payload: { data: null }, type: 'CLOSE_POPOVER' });
    this.deferredPrompt.current = null;
  }
}

const popoverManager = new PopoverManager();

export default popoverManager;
