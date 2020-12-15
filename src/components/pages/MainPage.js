import React, { useContext } from "react";
import GetCities from "../../hooks/fetchCities";
import { CityContext } from "../../contexts/CityContext";
import styled from "styled-components";
import "../../App.css";

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// const PlayButton = styled.button`
//   margin: 37% 40%;
//   height: 50px;
//   width: 120px;
//   border-radius: 20px;
//   outline: none;
//   font-weight: bold;
// `;

export default function MainPage() {
  GetCities();
  const cities = useContext(CityContext)[0];

  return (
    <MainPageContainer id="test">
      <h1>Geo Guesser</h1>
      <h3>by</h3>
      <h2>Geo Junkies</h2>
      <div id="globe"></div>
    </MainPageContainer>
  );
}
