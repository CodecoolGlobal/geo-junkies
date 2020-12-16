import React, { useState, createContext } from "react";

export const HighScoreContext = createContext();

export const HighScoreContextProvider = (props) => {
	const [highScore, setHighScore] = useState([
		{
			name: "Sandy",
      scores: [2500, 4900, 3000]},
      {
      name: "Oli",
			scores: [2140, 600, 330000],
		},
	]);

	return (
		<HighScoreContext.Provider value={[highScore, setHighScore]}>
			{props.children}
		</HighScoreContext.Provider>
	);
};
