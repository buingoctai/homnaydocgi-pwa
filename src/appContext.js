import React, { useReducer, createContext } from 'react';

export const AppContext = createContext();

const initState = {
  popover: {
    isOpen: false,
    data: null,
  },
};

const reducer = (state, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'OPEN_POPOVER':
      return {
        ...state,
        popover: {
          isOpen: true,
         ...payload,
        },
      };
    case 'CLOSE_POPOVER':
      return {
        ...state,
        popover: {
          isOpen: false,
         ...payload,
        },
      };
    default:
      throw new Error();
  }
};
// Create a provider for components to consume and subscribe to changes
export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(reducer, initState);

  return <AppContext.Provider value={[appState, dispatch]}>{props.children}</AppContext.Provider>;
};
