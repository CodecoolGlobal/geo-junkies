import React, { useState, createContext } from "react";

export const CityContext = createContext();

export const CityContextProvider = (props) => {
  const [cities, setCities] = useState([]);

  return (
    <CityContext.Provider value={[cities, setCities]}>
      {props.children}
    </CityContext.Provider>
  );
};
