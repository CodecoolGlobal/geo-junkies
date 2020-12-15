import React, { useState, createContext } from "react";

export const HighScoreContext = createContext();

export const HighScoreContextProvider = (props) => {
  const [highScore, setHighScore] = useState([]);

  return (
    <HighScoreContext.Provider value={[highScore, setHighScore]}>
      {props.children}
    </HighScoreContext.Provider>
  );
};
