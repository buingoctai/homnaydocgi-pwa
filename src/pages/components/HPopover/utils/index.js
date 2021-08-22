import {
  EVENTS,
  PLACEMENTS,
  BOUND_BOTTOM,
  BOUND_TOP,
  BOUND_LEFT,
  BOUND_RIGHT,
  CLASS_SUBMENU,
} from './constants';

export const isDomNode = (element) => {
  if (element) {
    const newEle = Object.create(HTMLElement.prototype, {});
    return typeof element === typeof newEle;
  }
  return false;
};

const parseStyle = (style) => {
  if (!style)
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  const { top = 0, left = 0, bottom = 0, right = 0 } = style;

  const parsedTop = parseInt(top, 10);
  const parsedLeft = parseInt(left, 10);
  const parsedBottom = parseInt(bottom, 10);
  const parsedRight = parseInt(right, 10);
  if (
    Number.isNaN(parsedTop) ||
    Number.isNaN(parsedLeft) ||
    Number.isNaN(parsedBottom) ||
    Number.isNaN(parsedRight)
  ) {
    console.error('[Popover-V3] deltaPosition is invalid');
    return;
  } else {
    return {
      top: parsedTop,
      left: parsedLeft,
      bottom: parsedBottom,
      right: parsedRight,
    };
  }
};

const destructSubPlacement = (placement) => {
  const endDirection = placement.split('-')[1];

  if (endDirection) {
    return `-${endDirection}`;
  } else {
    return '';
  }
};
export const adjustPlacement = (
  element,
  placement = PLACEMENTS['BOTTOM-LEFT'],
  deltaPosition = { top: 0, left: 0 },
  windowContext,
  contextPop
) => {
  if (!isDomNode(element)) return null;
  const bounding = element.getBoundingClientRect();
  const deltaStyle = parseStyle(deltaPosition);
  let _deltaPosition = { top: 0, left: 0 };
  let _placement = placement;
  let _exceed = { top: 0, left: 0 };
  let _height = bounding.height;

  if (bounding.top < 0) {
    // Top side is out of viewoprt

    const isPrefix = placement.indexOf('top') === 0;

    _exceed = { ..._exceed, top: -bounding.top + BOUND_TOP };
    if (contextPop) {
      _deltaPosition = { ..._deltaPosition, top: bounding.height };
    } else {
      _deltaPosition = {};
    }

    if (!contextPop) {
      _placement = isPrefix
        ? `bottom${destructSubPlacement(placement)}`
        : placement.replace('bottom', 'top');
    }
  }

  if (bounding.left < 0) {
    // Left side is out of viewoprt
    const isPrefix = _placement.indexOf('left') === 0;

    _exceed = { ..._exceed, left: -bounding.left + BOUND_LEFT };
    if (contextPop) {
      _deltaPosition = { ..._deltaPosition, left: bounding.width };
    } else {
      _deltaPosition = {};
    }

    if (!contextPop) {
      _placement = isPrefix
        ? `right${destructSubPlacement(_placement)}`
        : _placement.replace('right', 'left');
    }
  }

  if (
    bounding.bottom >
    (windowContext.window.innerHeight || windowContext.window.document.documentElement.clientHeight)
  ) {
    // Bottom is out of viewport
    const delta =
      bounding.bottom - windowContext.window.innerHeight >
      bounding.bottom - windowContext.window.document.documentElement.clientHeight
        ? bounding.bottom - windowContext.window.innerHeight
        : bounding.bottom - windowContext.window.document.documentElement.clientHeight;
    const isPrefix = _placement.indexOf('bottom') === 0;

    _exceed = { ..._exceed, top: -(delta + BOUND_BOTTOM) };
    if (contextPop) {
      _deltaPosition = { ..._deltaPosition, top: -bounding.height };
    } else {
      _deltaPosition = {};
    }

    if (!contextPop) {
      _placement = isPrefix
        ? `top${destructSubPlacement(_placement)}`
        : _placement.replace('top', 'bottom');
      _height = bounding.height - delta - BOUND_BOTTOM;
    }
  }

  if (
    bounding.right >
    (windowContext.window.innerWidth || windowContext.window.document.documentElement.clientWidth)
  ) {
    // Right side is out of viewport
    const delta =
      bounding.right - windowContext.window.innerWidth >
      bounding.right - windowContext.window.document.documentElement.clientWidth
        ? bounding.right - windowContext.window.innerWidth
        : bounding.right - windowContext.window.document.documentElement.clientWidth;
    const isPrefix = _placement.indexOf('right') === 0;

    _exceed = { ..._exceed, left: -(delta + BOUND_RIGHT) };
    if (contextPop) {
      _deltaPosition = { ..._deltaPosition, left: -bounding.width };
    } else {
      _deltaPosition = {};
    }

    if (!contextPop) {
      _placement = isPrefix
        ? `left${destructSubPlacement(_placement)}`
        : _placement.replace('left', 'right');
    }
  }

  if (
    !(
      bounding.top < 0 ||
      bounding.left < 0 ||
      bounding.bottom >
        (windowContext.window.innerHeight ||
          windowContext.window.document.documentElement.clientHeight) ||
      bounding.right >
        (windowContext.window.innerWidth ||
          windowContext.window.document.documentElement.clientWidth)
    )
  ) {
    _deltaPosition = deltaPosition;
    _placement = placement;
    _exceed = {};
  }

  return {
    deltaPosition: _deltaPosition,
    placement: _placement,
    height: _height,
    exceed: _exceed,
  };
};

export const reStyle = (style, placement, windowContext) => {
  switch (placement) {
    case PLACEMENTS['TOP']:
      return {
        left: style.left + style.width / 2,
        bottom: windowContext.window.innerHeight - style.top,
        transform: 'translateX(-50%)',
      };
    case PLACEMENTS['TOP-LEFT']:
      return {
        left: style.left,
        bottom: windowContext.window.innerHeight - style.top,
      };
    case PLACEMENTS['TOP-RIGHT']:
      return {
        right: windowContext.window.innerWidth - style.left - style.width,
        bottom: windowContext.window.innerHeight - style.top,
      };
    case PLACEMENTS['BOTTOM']:
      return {
        left: style.left + style.width / 2,
        top: style.top + style.height,
        transform: 'translateX(-50%)',
      };
    case PLACEMENTS['BOTTOM-LEFT']:
      return {
        left: style.left,
        top: style.top + style.height,
      };
    case PLACEMENTS['BOTTOM-RIGHT']:
      return {
        right: windowContext.window.innerWidth - style.left - style.width,
        top: style.top + style.height,
      };
    case PLACEMENTS['LEFT']:
      return {
        top: style.top + style.height / 2,
        right: windowContext.window.innerWidth - style.left,
        transform: 'translateY(-50%)',
      };
    case PLACEMENTS['LEFT-TOP']:
      return {
        top: style.top,
        right: windowContext.window.innerWidth - style.left,
      };
    case PLACEMENTS['LEFT-BOTTOM']:
      return {
        bottom: windowContext.window.innerHeight - style.top - style.height,
        right: windowContext.window.innerWidth - style.left,
      };
    case PLACEMENTS['RIGHT']:
      return {
        bottom: windowContext.window.innerHeight - style.top - style.height / 2,
        left: style.left + style.width,
        transform: 'translateY(50%)',
      };
    case PLACEMENTS['RIGHT-TOP']:
      return {
        left: style.left + style.width,
        top: style.top,
      };
    case PLACEMENTS['RIGHT-BOTTOM']:
      return {
        left: style.left + style.width,
        bottom: windowContext.window.innerHeight - style.top - style.height,
      };
    default:
      console.warn(`[Popover-V3] The ${placement} placement is not valid!`);
      return { left: style.left, top: style.top };
  }
};

export const getStyle = ({ target, event }, trigger, placement, deltaPosition, windowContext) => {
  if (!isDomNode(target)) {
    console.warn('[Popover-V3] In popover, anchorEl is not dom node. Return default style');
    return { top: '0px', left: '0px' };
  }

  let style = {};
  const deltaStyle = parseStyle(deltaPosition);
  const newTrigger = trigger || (event?.type === 'contextmenu' ? EVENTS.CONTEXT_MENU : '');

  switch (newTrigger) {
    case EVENTS.CONTEXT_MENU:
      style = {
        left: event.pageX + deltaStyle.left,
        top: event.pageY + deltaStyle.top,
      };
      break;
    default:
      const rect = target.getBoundingClientRect();
      style = {
        left: rect.left + windowContext.window.scrollX + deltaStyle.left,
        top: rect.top + windowContext.window.scrollY + deltaStyle.top,
        bottom: rect.bottom + deltaStyle.bottom,
        right: rect.right + deltaStyle.right,
        width: rect.width,
        height: rect.height,
      };

      style = reStyle(style, placement, windowContext);
  }

  return style;
};

export const addArrowClassName = (isArrow, placement) => {
  if (!isArrow) return '';

  switch (placement) {
    case PLACEMENTS['TOP']:
      return 'popover-v3-arrow popover-v3-top';
    case PLACEMENTS['TOP-LEFT']:
      return 'popover-v3-arrow popover-v3-top-left';
    case PLACEMENTS['TOP-RIGHT']:
      return 'popover-v3-arrow popover-v3-top-right';

    case PLACEMENTS['BOTTOM']:

    case PLACEMENTS['BOTTOM-LEFT']:

    case PLACEMENTS['BOTTOM-RIGHT']:

    case PLACEMENTS['LEFT']:

    case PLACEMENTS['LEFT-TOP']:

    case PLACEMENTS['LEFT-BOTTOM']:

    case PLACEMENTS['RIGHT']:

    case PLACEMENTS['RIGHT-TOP']:

    case PLACEMENTS['RIGHT-BOTTOM']:

    default:
      return '';
  }
};

export const isPointInRectangle = (x, y, rect) => {
  if (!x || !y || !rect) return false;
  return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
};

export const isEffectInPopover = (x1, y1, container, subPopClassName) => {
  if (!isDomNode(container) || !x1 || !y1) return false;
  const rectElement = [container];

  // Add menu element
  // Be carefull querySelectorAll() return NodeList, not array
  // To make sure it work on all browser, use for loop
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList#example
  const rootSubList = container.querySelectorAll(`.${CLASS_SUBMENU}`);
  for (let i = 0; i < rootSubList.length; i++) {
    const rect = rootSubList.item(i).firstChild;
    if (rect) rectElement.push(rect);
  }
  // Custom sub pop class name
  if (subPopClassName) {
    const subPopList = container.querySelectorAll(`.${subPopClassName}`);
    for (let i = 0; i < subPopList.length; i++) {
      rectElement.push(subPopList.item(i));
    }
  }

  for (let i = 0; i < rectElement.length; i++) {
    const { x, y, width, height } = rectElement[i].getBoundingClientRect();
    if (isPointInRectangle(x1, y1, { x, y, width, height })) {
      return true;
    }
  }
  return false;
};

export const comparePlacements = (placementA, placementB) => {
  if (
    !placementA ||
    !placementB ||
    !(typeof placementA === 'string') ||
    !(typeof placementB === 'string')
  )
    return false;

  const subListA = placementA.split('-');
  const subListB = placementB.split('-');

  for (let i = 0; i < subListA.length; i++) {
    if (subListA[i] === subListB[i]) return true;
  }

  return false;

  // return placementA === placementB
};
