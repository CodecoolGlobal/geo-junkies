import React, { useContext } from "react";
import styled from "styled-components";
import { HighScoreContext } from "../../contexts/HighScoreContext";
import "../../style/high-score.css";

const PlayersContainer = styled.div`
	margin-top: 5%;
	margin-left: 25%;
	width: 60%;
	border: 5px solid lightgrey;
	padding: 10px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;

export default function HighScores() {
	const players = useContext(HighScoreContext)[0];
	const setPlayers = useContext(HighScoreContext)[1];

	const getTop10Scores = () => {
		players.sort(function (a, b) {
			return a.score - b.score;
		});
		return players.reverse().slice(0, 10);
	};

	// setPlayers((prev) => [...prev, { name: "Marci", score: 9000 }]);
	let content = <p>No Scores Saved</p>;

	if (players && players.length > 0) {
		const orderedPlayers = getTop10Scores();
		content = (
			<PlayersContainer>
				<h1 className="score-title">High Scores</h1>
				<table>
					<thead>
						<tr>
							<th className="rank">Rank</th>
							<th className="players">Players</th>
							<th className="scores">Scores</th>
						</tr>
					</thead>
					<tbody>
						{orderedPlayers.map((player, index) => (
							<tr>
								<td>{index + 1}</td>
								<td>{player.name}</td>
								<td>{player.score}</td>
							</tr>
						))}
					</tbody>
				</table>
			</PlayersContainer>
		);
	}

	return content;
}
