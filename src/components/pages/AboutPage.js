import React from "react";
import styled from "styled-components";
import AboutPageContainer from "../elements/AboutPageContainer";
import "../../style/Images.css";

const Title = styled.h1`
  position: absolute;
  text-align: left;
  margin-top: 5%;
  margin-left: 8%;
`;

const Title2 = styled.h1`
  position: relative;
  text-align: right;
  margin-right: 9%;
  padding-bottom: 4%;
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
  margin-right: 20px;
  display: inline-block;
  font-weight: bold;
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
      <Title2>Team</Title2>
    </AboutPageContainer>
  );
}
