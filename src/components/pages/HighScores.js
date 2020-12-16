import React, { useContext } from "react";
import styled from "styled-components";
import { HighScoreContext } from "../../contexts/HighScoreContext";

const PlayersContainer = styled.div`
	margin-top: 5%;
	margin-left: 25%;
	width: 60%;
	/* border: 5px solid #ffff00; */
	padding: 10px;
	/* background-color: black; */
	display: flex;
	justify-content: space-evenly;
`;

const PlayersCard = styled.div`
	height: 200px;
	width: 200px;
	padding: 5%;
	background-color: #fff;
	align-items: center;
`;

export default function HighScores() {
	const players = useContext(HighScoreContext)[0];

	const getTop5Scores = (scoresArray) => {
		scoresArray.sort(function (a, b) {
			return a - b;
		});
		return scoresArray.reverse().slice(0, 5);
	};

	let content = <p>Loading...</p>;

	if (players && players.length > 0) {
		content = (
			<PlayersContainer>
				{players.map((player) => (
					<PlayersCard>
						<div>{player.name}</div>
						{getTop5Scores(player.scores).map((score) => (
							<div>{score}</div>
						))}
					</PlayersCard>
				))}
			</PlayersContainer>
		);
	}

	return content;
}
