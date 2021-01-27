import React from "react";
import FooterContainer from "../elements/FooterContainer";
import styled from "styled-components";

const CopyRight = styled.div`
	margin-left: 5%;
	font-weight: bold;
`;

const Sponsor = styled.div`
	margin-right: 5%;
`;

const Logo = styled.div`
	margin-right: 1%;
`;

export default function Footer() {
	return (
		<FooterContainer>
			<CopyRight>Copyright 2021 - Geo Junkies</CopyRight>
      <Logo id="logo"></Logo>
			<Sponsor>Sponsored by Márton Kozma</Sponsor>
		</FooterContainer>
	);
}
