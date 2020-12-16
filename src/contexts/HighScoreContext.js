import React, { useState, createContext } from "react";

export const HighScoreContext = createContext();

export const HighScoreContextProvider = (props) => {
	const [highScore, setHighScore] = useState([
		{
			name: "Sandy",
			score: 3000,
		},
		{
			name: "Oli",
			score: 2140,
		},
		{
			name: "Sandy",
			score: 4000,
		},
	]);

	return (
		<HighScoreContext.Provider value={[highScore, setHighScore]}>
			{props.children}
		</HighScoreContext.Provider>
	);
};
