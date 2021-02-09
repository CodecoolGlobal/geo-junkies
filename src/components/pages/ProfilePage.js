import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import APIs from "../files/ApiRequestURL.json";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../../style/High-score.css";
import PlayersContainer from "../elements/PlayerContainer";

export default function ProfilePage() {
	const user = useContext(UserContext)[0];
	const [scores, setScores] = useState();
	const [mapId, setMapId] = useState(1);
	const [errorMessage, setErrorMessage] = useState([]);

	useEffect(() => {
		const getHighScore = async () => {
			const responseData = await axios({
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json, text/plain, */*",
					Authorization: "Bearer " + user.token,
				},
				url: `${APIs.highscore}${mapId}`,
			});
			setScores(responseData.data);
		};
		getHighScore().catch((error) => setErrorMessage(error.response.data));
	}, [mapId, user.token]);

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
			<PlayersContainer>
				<div>
					<h2>{user.username}</h2>
				</div>
				<h1 className="title">My Scores</h1>
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
							<th className="left-row">Rank</th>
							<th className="center-row">Score</th>
							<th className="right-row">Date</th>
						</tr>
					</thead>
					<tbody>
						{scores
							? scores.map((player, index) => (
									<tr key={index}>
										<td className="left-row">{index + 1}</td>
										<td className="center-row">{player.score}</td>
										<td className="right-row">{player.created_at}</td>
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

	return user.token ? content : <Redirect to="/" />;
}
