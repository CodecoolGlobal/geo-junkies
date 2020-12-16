import React from "react";
import styled from "styled-components";
import "../../style/App.css";

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.3em;
  letter-spacing: 0.2em;
  font-weight: bold;
`;

export default function MainPage() {
  return (
    <MainPageContainer id="test">
      <h1>Geo Guesser</h1>
      <h3>by</h3>
      <h2>Geo Junkies</h2>
      <div id="globe"></div>
    </MainPageContainer>
  );
}
