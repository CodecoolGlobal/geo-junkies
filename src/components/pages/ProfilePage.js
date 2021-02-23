import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import APIs from "../files/ApiRequestURL.json";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import "../../style/High-score.css";
import {
  PlayersContainer,
  ProfileContainer,
} from "../elements/PlayerContainer";

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
    <div>
      <button
        onClick={() => console.log("export the data")}
        style={{ backgroundColor: "blue" }}
      >
        Save to file
      </button>
      <PlayersContainer>
        <div className="user">{user.username}</div>
        <h1 className="title">My Scores</h1>
        <div className="buttonBox">
          {countries.map((country, index) => (
            <button
              className={`map-title ${index + 1 === mapId ? "active" : ""}`}
              data-mapid={index + 1}
              onClick={() => switchMap(index + 1)}
            >
              {country}
            </button>
          ))}
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="left-row">Rank</th>
                <th className="center-row">Score</th>
                <th className="right-row date"> Date</th>
              </tr>
            </thead>
            <tbody>
              {scores
                ? scores.map((player, index) => (
                    <tr key={index}>
                      <td className="left-row">{index + 1}</td>
                      <td className="center-row">{player.score}</td>
                      <td className="right-row">
                        {player.created_at.split(" ")[0]}
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </PlayersContainer>
      {errorMessage === null
        ? ""
        : errorMessage.map((data, index) => <div key={index}>{data}</div>)}
    </div>
  );

  return user.token ? content : <Redirect to="/" />;
}
