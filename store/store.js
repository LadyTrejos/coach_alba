import React, { createContext, useReducer } from "react";

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOGIN":
        const newState = "hola";
        return newState;
      default:
        throw new Error("Invalid action");
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
