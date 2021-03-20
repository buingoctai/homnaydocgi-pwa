import ReactDOM from 'react-dom';
import React from 'react';
import Popover from './index';

class PopoverManager {
  open(menu) {
    ReactDOM.render(<Popover child={menu} />, document.getElementById('popover'));
  }
  close() {
    if (!document.getElementById('popover').hasChildNodes()) return;
    ReactDOM.unmountComponentAtNode(document.getElementById('popover'));
  }
}

const popoverManager = new PopoverManager();

export default popoverManager;
