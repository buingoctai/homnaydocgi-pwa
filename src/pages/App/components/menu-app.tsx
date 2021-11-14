import React from 'react';
import IconMenuApp from 'srcRoot/static/svg/icon-menu-app.svg';
import { PopupIdentities } from 'srcRoot/utils/constants';

import { PopoverManager } from '@taibn.dev.vn/h-popover';

const MenuApp = () => {
  return (
    <div className="menu-app" style={{ display: 'none' }}>
      <img
        src={IconMenuApp}
        width={60}
        onClick={() => {
          PopoverManager.openPopover({ ...PopupIdentities['LEFT_SIDEBAR'], onAfterOpen: () => {} });
        }}
      />
    </div>
  );
};

export default MenuApp;
