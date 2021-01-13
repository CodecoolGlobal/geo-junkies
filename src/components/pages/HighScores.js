import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../style/high-score.css";
import APIs from "../files/ApiRequestURL.json";
import useGetData from "../../hooks/UseGet";
import axios from "axios";

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
	letter-spacing: 0.1em;
`;

export default function HighScores() {
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		axios
			.get(`${APIs.highscores}`)
			.then((result) => setPlayers(result.data.highscores));
	}, []);

	let content = <p>No Scores Saved</p>;

	if (players && players.length > 0) {
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
						{players.map((player, index) => (
							<tr key={index}>
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
