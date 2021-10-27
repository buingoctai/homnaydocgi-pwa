import React, { useRef } from 'react';
import Button from 'srcRoot/components/Button';
import { useHistory } from 'react-router-dom';
import { TRANSITION_TIME_PAGE } from 'srcRoot/app-config';
import useFlightAnime from 'srcRoot/animations/use-flight-anime';

const AccessBtn = ({
  turnOffWelcome,
  routes,
  showingIdx,
}: {
  turnOffWelcome: (value: boolean) => void;
  routes?: Array<{ route: { pathname: string; callback?: () => any } }>;
  showingIdx: number;
}) => {
  const history = useHistory();
  const refBtn = useRef(null);
  const [onFlight] = useFlightAnime(refBtn.current);
  return (
    <Button
      text="Dùng Ngay"
      className="access__btn"
      ref={refBtn}
      onClick={(e) => {
        onFlight(e);

        setTimeout(() => {
          turnOffWelcome(true);
          history.push(routes[showingIdx].route.pathname);
          setTimeout(() => {
            if (routes[showingIdx].route.callback) routes[showingIdx].route.callback();
          }, TRANSITION_TIME_PAGE + 500);
        }, 2500);
      }}
    />
  );
};

export default AccessBtn;
