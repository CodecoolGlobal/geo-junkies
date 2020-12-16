import styled from "styled-components";

export const MapContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 90%;
  height: 95%;
  padding-left: 5%;
`;

export const UserAndCityContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
`;

export const InfoParagraph = styled.div`
  letter-spacing: 0.02em;
`;

export const InfoSpan = styled.span`
  font-weight: bold;
`;

export const NextCityButton = styled.button`
  margin-top: 5px;
  border-radius: 5px;
  padding: 5px;
  font-size: 1em;
  outline: none;
  letter-spacing: 0.1em;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

export const SetUsernameButton = styled.button`
  border-radius: 10px;
  width: 80px;
  padding: 5px;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  margin-top: 10px;
  letter-spacing: 0.1em;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

export const UsernameLabel = styled.label`
  font-size: 1em;
  letter-spacing: 0.03em;
`;

export const UsernameInput = styled.input`
  font-size: 1em;
  margin-top: 5px;
  border-radius: 5px;
  padding-left: 3px;
  outline: none;
  letter-spacing: 0.02em;
`;

export const UsernameContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 45%;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
  background-color: lightgrey;
  opacity: 0.9;
  border: 1px solid black;
  letter-spacing: 0.05em;
`;
