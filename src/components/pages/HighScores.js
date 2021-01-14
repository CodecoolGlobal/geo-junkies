import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import "../../style/high-score.css";
import APIs from "../files/ApiRequestURL.json";
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

	.buttonBox {
		height: 10%;
		margin-bottom: -3px;

		display: flex;
		justify-content: space-around;
		align-items: flex-end;

		button {
			width: 50%;
			padding: 6px 0;
			outline: none;
			cursor: pointer;
			border: none;
			border-bottom: white solid 3px;
			border-right: white solid 3px;
			background-color: rgba(163, 163, 163);
		}

		.active {
			font-weight: 750;
			background-color: lightgrey;
		}

		#leftButton {
			border-radius: 15px 0 0;
		}

		#rightButton {
			border-radius: 0 15px 0 0;
			border-right: none;
		}

		.map-title {
			font-size: 3rem;
			text-align: center;
			color: rgb(231, 231, 195);
			text-decoration: none;
			text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
			padding: 5px;
			font-weight: bold;
			font-size: 1.5em;
		}
	}
`;

export default function HighScores() {
	const [players, setPlayers] = useState([]);
	const [mapId, setMapId] = useState(1);
	const [errorMessage, setErrorMessage] = useState([]);

	useEffect(() => {
		axios
			.get(`${APIs.highscores}${mapId}`)
			.then((result) => setPlayers(result.data.highscores));
	}, [mapId]);

	// useEffect(async () => {
	//   let responseData = await axios({
	//     headers: {
	//       "Content-Type": "application/json",
	//       Accept: "application/json, text/plain, */*",
	//       Authorization: "Bearer " + user.token,
	//     },
	//     url: `${APIs.highscore}${mapId}`,
	//   });
	//   setScores(responseData.data);
	// }, [mapId]);

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
		<div>
			<PlayersContainer>
				<h1 className="score-title">High Scores</h1>
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
						Usa
					</button>
				</div>
				<table>
					<thead>
						<tr>
							<th className="rank">Rank</th>
							<th className="players">Player</th>
							<th className="scores">Score</th>
						</tr>
					</thead>
					<tbody>
						{players
							? players.map((player, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{player.name}</td>
										<td>{player.score}</td>
									</tr>
							  ))
							: ""}
					</tbody>
				</table>
			</PlayersContainer>
			{errorMessage === null
				? ""
				: errorMessage.map((data, index) => <div key={index}>{data}</div>)}
		</div>
	);

	return content;
}
