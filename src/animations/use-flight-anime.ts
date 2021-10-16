import React, { useCallback, useEffect, useRef } from 'react';

const xmlns = 'http://www.w3.org/2000/svg';

const updateStyles = (element: HTMLElement | null, style: any): void => {
  if (!element) return;

  for (const key in style) {
    element.style[key] = style[key];
  }
};

const genPolycon = (type: string): Array<any> => {
  switch (type) {
    case 'STAR':
      const p1 = document.createElementNS(xmlns, 'polygon');
      p1.classList.add('star');
      p1.setAttribute(
        'points',
        '21,0,28.053423027509677,11.29179606750063,40.97218684219823,14.510643118126104,32.412678195541844,24.70820393249937,33.34349029814194,37.989356881873896,21,33,8.656509701858067,37.989356881873896,9.587321804458158,24.70820393249937,1.0278131578017735,14.510643118126108,13.94657697249032,11.291796067500632'
      );

      const p2 = document.createElementNS(xmlns, 'polygon');
      p2.classList.add('other-star');
      p2.setAttribute(
        'points',
        '18,0,22.242640687119284,13.757359312880714,36,18,22.242640687119284,22.242640687119284,18.000000000000004,36,13.757359312880716,22.242640687119284,0,18.000000000000004,13.757359312880714,13.757359312880716'
      );

      const p3 = document.createElementNS(xmlns, 'polygon');
      p3.classList.add('diamond');
      p3.setAttribute(
        'points',
        '18,0,27.192388155425117,8.80761184457488,36,18,27.19238815542512,27.192388155425117,18.000000000000004,36,8.807611844574883,27.19238815542512,0,18.000000000000004,8.80761184457488,8.807611844574884'
      );

      return [p1, p2, p3];
    default:
      return [];
  }
};

const useFlightAnime = (targetEl: any, _typeAnime?: string, _colors?: Array<string>) => {
  const animeContainer = useRef(null);
  const colors = _colors || ['#ffb3f6', '#7aa0ff', '#333'];
  const typeAnime = _typeAnime || 'STAR';

  const onClick = useCallback(
    (e: { pageX: number; pageY: number }) => {
      if (!targetEl) return;
      const { pageX = 500, pageY = 500 } = e;
      let group = [];
      const num = Math.floor(Math.random() * 50) + 10;

      for (let i = 0; i < num; i++) {
        const randBG = Math.floor(Math.random() * colors.length);
        const scale = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
        const x = Math.floor(Math.random() * (150 + 100)) - 100;
        const y = Math.floor(Math.random() * (150 + 100)) - 100;
        const sec = Math.floor(Math.random() * 1700) + 1000;

        /* Gen poly and add poly into svg */
        const polyList = genPolycon(typeAnime);
        const randomPoly = Math.floor(Math.random() * polyList.length);
        const shape: any = document.createElementNS(xmlns, 'svg');

        updateStyles(shape, {
          position: 'absolute',
          width: '50px',
          height: '50px',
          transform: 'scale(0.8)',
        });

        shape.append(polyList[randomPoly]);
        updateStyles(shape, {
          top: `${pageY - targetEl.offsetTop + 20}px`,
          left: `${pageX - targetEl.offsetLeft + 40}px`,
          transform: `scale(0.'+${scale}+')`,
          transition: `${sec}ms`,
          fill: `${colors[randBG]}`,
        });
        /***************** */

        animeContainer.current.append(shape);
        group.push({ shape: shape, x: x, y: y });
      }

      for (let a = 0; a < group.length; a++) {
        const shape = group[a].shape;
        const x = group[a].x;
        const y = group[a].y;

        updateStyles(shape, {
          top: `${y + 15}px`,
          left: `${x + 50}px`,
          transform: `scale(0)`,
        });
      }

      setTimeout(function () {
        for (var b = 0; b < group.length; b++) {
          const shape = group[b].shape;
          animeContainer.current.removeChild(shape);
        }
        group = [];
      }, 2000);
    },
    [targetEl]
  );

  /* Create flight place*/
  useEffect(() => {
    if (!targetEl) {
      console.error('[Use-flight-anime]: Target was undefined', targetEl);
      return;
    }
    const parent = targetEl.parentElement || targetEl;
    animeContainer.current = document.createElement('div');
    updateStyles(animeContainer.current, {
      width: '100px',
      height: '100px',
      position: 'absolute',
      borderRadius: '50%',
      color: '#eee',
      fontFamily: 'monospace',
      zIndex: '5',
    });
    parent.append(animeContainer.current);
  }, [targetEl]);

  return [onClick];
};

export default useFlightAnime;
