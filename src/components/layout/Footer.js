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

export default function Footer() {
  return (
    <FooterContainer>
      <CopyRight>Copyright 2020 - Geo Junkies</CopyRight>
      <Sponsor>Sponsored by Márton Kozma</Sponsor>
    </FooterContainer>
  );
}
