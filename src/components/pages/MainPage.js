import React from "react";
import styled from "styled-components";
import "../../style/App.css";
import selectPic from "../images/map-selection.png";
import guessPic from "../images/map-guess.png";
import scorePic from "../images/map-highscore.png";

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 5%;
  padding-top: 5%;
  display: inline-block;
  align-items: center;
  flex-direction: column;
  font-family: Arial, sans-serif;
  @media screen and (max-width: 1520px) {
    font-size: 1.2em;
  }
  @media screen and (max-width: 1400px) {
    font-size: 1.1em;
  }
  @media screen and (max-width: 1300px) {
    font-size: 1em;
  }
  @media screen and (max-width: 1200px) {
    font-size: 0.95em;
  }
  @media screen and (max-width: 1100px) {
    font-size: 0.8em;
  }
  @media screen and (max-width: 1000px) {
    font-size: 0.75em;
    min-width: 100px;
  }
`;

export default function MainPage() {
  return (
    <MainPageContainer id="test">
      <div id="main-describe">
        <h1>
          <u>Game Description</u>
        </h1>
        <p>
          <b>GeoGuesser</b> is a geography game which takes you on a journey
          around the world and challenges your ability to recognize your
          surroundings.
        </p>
        <hr></hr>
        <p>
          <img src={selectPic} alt="Map selection pic" />
          In the game you can choose from many individual maps to play on.
        </p>
        <hr></hr>
        <p>
          <img src={guessPic} alt="Gameplay pic" />
          During the game you will get a random city name on the right side and
          you have to guess the city location by clicking on the map to earn
          points.
        </p>
        <hr></hr>
        <p>
          <img src={scorePic} alt="Highscore pic" />
          After the 5 guessing your total score will be saved into the Highscore
          table that you can follow in your personal page or if you get high
          enough score than it will appear in the Highscore tab.
        </p>
      </div>
      <div id="globe"></div>
    </MainPageContainer>
  );
}
