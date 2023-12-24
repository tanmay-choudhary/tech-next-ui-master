import React, { createContext, useContext, useReducer } from "react";

const DataContext = createContext();

const initialState = {
  formData: {
    phase: "",
    id: "",
    date: "",
  },
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, formData: action.payload };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
