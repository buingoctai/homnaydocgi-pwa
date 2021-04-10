import ReactDOM from 'react-dom';
import React from 'react';
import Popover from './index';

class PopoverManager {
  constructor(){
    this.dispatch = null;
  }

  bindDispatch(func){
    this.dispatch = func;
  }
  open(child,style){
    this.dispatch({isShow: true, data:{child,style}});
  }
  close(){
    this.dispatch({isShow: false, data:{}});
  }
}

const popoverManager = new PopoverManager();

export default popoverManager;
