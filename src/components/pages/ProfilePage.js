import React, { useContext, useState } from "react";
import styled from "styled-components";
import { HighScoreContext } from "../../contexts/HighScoreContext";
import { UserContext } from "../../contexts/UserContext";
import "../../style/high-score.css";

const ProfileContainer = styled.div`
  margin-top: 5%;
  margin-left: 15%;
  width: 80%;
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

export default function ProfilePage() {
  const user = useContext(UserContext)[0];
  const players = useContext(HighScoreContext)[0];
  const [mapId, setMapId] = useState(1);

  const getTop10Scores = () => {
    players.sort(function (a, b) {
      return a.score - b.score;
    });
    return players.reverse().slice(0, 10);
  };

  const switchMap = (mapId) => {
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
    // const otherMode = mode === 'login' ? 'register' : 'login';
  };

  let content = <p>No Scores Saved</p>;

  if (players && players.length > 0) {
    const orderedPlayers = getTop10Scores();
    content = (
      <div>
        <ProfileContainer>
          <h2>my username</h2>
          <h2>registration date</h2>
          <h1 className="score-title">My Scores</h1>
          <div className="buttonBox">
            <button
              id="leftButton"
              className="active map-title"
              data-mapid="1"
              onClick={() => switchMap(1)}
            >
              Africa
            </button>
            <button
              className="map-title"
              data-mapid="6"
              onClick={() => switchMap(6)}
            >
              Asia
            </button>
            <button
              className="map-title"
              data-mapid="4"
              onClick={() => switchMap(4)}
            >
              Australia
            </button>
            <button
              className="map-title"
              data-mapid="5"
              onClick={() => switchMap(5)}
            >
              Europe
            </button>
            <button
              className="map-title"
              data-mapid="7"
              onClick={() => switchMap(7)}
            >
              Hungary
            </button>
            <button
              className="map-title"
              data-mapid="3"
              onClick={() => switchMap(3)}
            >
              S. America
            </button>
            <button
              className="map-title"
              id="rightButton"
              data-mapid="2"
              onClick={() => switchMap(2)}
            >
              Usa
            </button>
          </div>

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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProfileContainer>
      </div>
    );
  }

  return content;
}
