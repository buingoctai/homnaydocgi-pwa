import React,{useRef} from 'react';
import IconMenuApp from 'srcRoot/static/svg/icon-menu-app.svg';
import { PopupIdentities } from 'srcRoot/utils/constants';
import { PopoverManager } from '@taibn.dev.vn/h-popover';
import useFlightAnime from 'srcRoot/animations/use-flight-anime';

const MenuApp = () => {
  const refBtn = useRef(null);
  const [onFlight] = useFlightAnime(refBtn.current);

  return (
    <div className="menu-app" style={{ display: 'none' }} >
      <img
        src={IconMenuApp}
        width={60}
        onClick={(e) => {
          onFlight(e);
          PopoverManager.openPopover({ ...PopupIdentities['LEFT_SIDEBAR'], onAfterOpen: () => {} });
        }}
        ref={refBtn}
      />
    </div>
  );
};

export default MenuApp;
