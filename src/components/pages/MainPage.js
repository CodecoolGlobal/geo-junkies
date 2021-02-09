import React from "react";
import styled from "styled-components";
import "../../style/App.css";

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  align-items: center;
  flex-direction: column;
  font-size: 2em;
  letter-spacing: 0.2em;
  font-weight: bold;
  font-family: Arial, sans-serif;
`;

export default function MainPage() {
  return (
    <MainPageContainer id="test">
      <div id="main-describe">
        <p>Game Description</p>
      </div>
      <div id="globe"></div>
    </MainPageContainer>
  );
}
