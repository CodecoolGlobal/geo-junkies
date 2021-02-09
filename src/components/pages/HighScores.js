import React, { useState, useEffect } from "react";
// import "../../style/High-score.css";
import APIs from "../files/ApiRequestURL.json";
import axios from "axios";
import { PlayersContainer } from "../elements/PlayerContainer";

export default function HighScores() {
	const [players, setPlayers] = useState([]);
	const [mapId, setMapId] = useState(1);

	useEffect(() => {
		axios
			.get(`${APIs.highscores}/${mapId}`)
			.then((result) => setPlayers(result.data.highscores));
	}, [mapId]);

	const switchMap = async (mapId) => {
		setMapId(mapId);
	};

	const countries = [
		"Africa",
		"USA",
		"S. America",
		"Australia",
		"Europe",
		"Asia",
		"Hungary",
	];

	let content = (
		<div className="container">
			<PlayersContainer>
				<h1 className="title">High Scores</h1>
				<div className="buttonBox">
					{countries.map((country, index) => (
						<button
							className={`map-title ${index + 1 === mapId ? "active" : ""}`}
							data-mapid={index + 1}
							onClick={() => switchMap(index + 1)}>
							{country}
						</button>
					))}
				</div>
				<table>
					<thead>
						<tr>
							<th className="left-row">Rank</th>
							<th className="center-row">Player</th>
							<th className="right-row">Score</th>
						</tr>
					</thead>
					<tbody>
						{players
							? players.map((player, index) => (
									<tr key={index}>
										<td className="left-row">{index + 1}</td>
										<td className="center-row">{player.name}</td>
										<td className="right-row">{player.score}</td>
									</tr>
							  ))
							: ""}
					</tbody>
				</table>
			</PlayersContainer>
		</div>
	);

	return content;
}
