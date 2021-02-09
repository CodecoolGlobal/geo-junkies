import React, { useState, useEffect } from "react";
import "../../style/High-score.css";
import APIs from "../files/ApiRequestURL.json";
import axios from "axios";
import PlayersContainer from "../elements/PlayerContainer";

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
		markActive(mapId);
	};

	const markActive = (mapId) => {
		let buttons = document.querySelectorAll(`button`);
		for (const button of buttons) {
			button.classList.remove("active");
		}
		document
			.querySelector(`button[data-mapId="${mapId}"]`)
			.classList.add("active");
	};

	let content = (
		<div className="container">
			<div className="player-container">
				<h1 className="title">High Scores</h1>
				<div className="buttonBox">
					<button
						id="leftButton"
						className="active map-title"
						data-mapid="1"
						onClick={() => switchMap(1)}>
						Africa
					</button>
					<button
						className="map-title"
						data-mapid="6"
						onClick={() => switchMap(6)}>
						Asia
					</button>
					<button
						className="map-title"
						data-mapid="4"
						onClick={() => switchMap(4)}>
						Australia
					</button>
					<button
						className="map-title"
						data-mapid="5"
						onClick={() => switchMap(5)}>
						Europe
					</button>
					<button
						className="map-title"
						data-mapid="7"
						onClick={() => switchMap(7)}>
						Hungary
					</button>
					<button
						className="map-title"
						data-mapid="3"
						onClick={() => switchMap(3)}>
						S. America
					</button>
					<button
						className="map-title"
						id="rightButton"
						data-mapid="2"
						onClick={() => switchMap(2)}>
						USA
					</button>
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
			</div>
		</div>
	);

	return content;
}
