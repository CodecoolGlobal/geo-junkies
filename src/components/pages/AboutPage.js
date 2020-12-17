import React from "react";
import styled from "styled-components";
import AboutPageContainer from "../elements/AboutPageContainer";
import "../../style/Images.css";

const Title = styled.h1`
	position: absolute;
	text-align: left;
	margin-top: 5%;
	margin-left: 8%;
	color: grey;
	text-decoration: none;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
	letter-spacing: 0.2em;
`;

const Title2 = styled.h1`
	position: relative;
	text-align: right;
	margin-right: 9%;
	padding-bottom: 4%;
	color: grey;
	text-decoration: none;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
	letter-spacing: 0.2em;
`;

const SandyContainer = styled.div`
	margin-top: 8%;
	margin-right: 7%;
`;
const MarciContainer = styled.div`
	margin-top: 1%;
	margin-right: 30%;
`;
const OliContainer = styled.div`
	margin-top: 1%;
	margin-right: 53%;
`;
const SzobaContainer = styled.div`
	margin-top: 1%;
	margin-right: 76%;
`;

const Names = styled.div`
	margin-right: 10px;
	display: inline-block;
	font-weight: bold;
	font-size: 1.2em;
`;

const ImageContainer = styled.div`
	display: inline-block;
	border: 1px solid darkgrey;
	border-radius: 5px;
	height: 100px;
	width: 100px;
	vertical-align: middle;
`;

export default function AboutPage() {
	return (
		<AboutPageContainer>
			<Title>Geo Junkies</Title>
			<SandyContainer>
				<Names>Sandy</Names>
				<ImageContainer id="sandy"></ImageContainer>
			</SandyContainer>
			<MarciContainer>
				<Names>Marci</Names>
				<ImageContainer id="marci"></ImageContainer>
			</MarciContainer>
			<OliContainer>
				<Names>Oli</Names>
				<ImageContainer id="oli"></ImageContainer>
			</OliContainer>
			<SzobaContainer>
				<Names>SzoBa</Names>
				<ImageContainer id="szoba"></ImageContainer>
			</SzobaContainer>
			<Title2>
				<ImageContainer id="icon"></ImageContainer>
			</Title2>
		</AboutPageContainer>
	);
}
