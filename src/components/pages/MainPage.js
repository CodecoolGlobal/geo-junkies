import React from "react";
import styled from "styled-components";
import "../../style/App.css";

const MainPageContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 2em;
	letter-spacing: 0.2em;
	font-weight: bold;
	font-family: Arial, sans-serif;
`;

const Title = styled.h1`
	color: black;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
	border-radius: 5px;
	border: 1px solid #cbcbcb;
	box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
  background-color: lightgray;
	padding: 5px;
`;

export default function MainPage() {
	return (
		<MainPageContainer id="test">
			<Title>Geo Guesser</Title>
			{/* <h3>by</h3> */}
			{/* <h2>Geo Junkies</h2> */}
			<div id="globe"></div>
		</MainPageContainer>
	);
}
