import ReactDOM from 'react-dom';
import React from 'react';
import Popover from './index';

class PopoverManager {
  constructor() {
    this.dispatch = null;
  }

  bindDispatch(func) {
    this.dispatch = func;
  }
  open(child, style) {
    this.dispatch({ payload: { data: { child, style } }, type: 'OPEN_POPOVER' });
  }
  close() {
    this.dispatch({ payload: { data: null }, type: 'CLOSE_POPOVER' });
  }
}

const popoverManager = new PopoverManager();

export default popoverManager;
