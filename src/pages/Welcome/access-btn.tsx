import React, { useEffect, useRef, useState } from 'react';
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
  const [, force] = useState(0);
  const history = useHistory();
  const refBtn = useRef(null);
  const [onFlight] = useFlightAnime(refBtn.current);

  useEffect(() => {
    force(Math.random());
  }, []);

  return (
    <Button
      text="Thử Ngay"
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
