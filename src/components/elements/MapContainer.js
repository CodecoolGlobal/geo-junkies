import styled from "styled-components";

export const MapContainer = styled.div`
  padding-top: 1%;
  overflow-y: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const UserAndCityContainer = styled.div`
  height: 55%;
  width: 25%;
`;

export const ScoreParagraph = styled.div`
  letter-spacing: 0.02em;
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
  width: 140px;
  font-size: 1em;
  outline: none;
  letter-spacing: 0.1em;
  background: linear-gradient(to bottom, #22abe9 5%, #36caf0 100%);
  box-shadow: inset 0 1px 0 0 #7bdcf4;
  border: 1px solid #0f799e;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 1px 0 #13506d;
  &:hover {
    background: linear-gradient(to bottom, #36caf0 5%, #22abe9 100%);
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

export const MapDataContainer = styled.div`
  width: 100%;
  padding: 2% 0 2% 0;
  font-size: 1.3em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.9;
  border-radius: 20px;
  background: linear-gradient(#fff, #f2f6f9);
  box-shadow: 0 0 0 1px rgba(14, 41, 57, 0.12), 0 2px 5px rgba(14, 41, 57, 0.44),
    inset 0 -1px 2px rgba(14, 41, 57, 0.15);
  & > div {
    padding: 5px;
  }
`;

export const ActualInfoContainer = styled.div`
  margin-top: 20%;
  height: 250px;
  width: 100%;
  padding: 1% 0 1% 0;
  font-size: 1.3em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
  background: linear-gradient(#fff, #f2f6f9);
  box-shadow: 0 0 0 1px rgba(14, 41, 57, 0.12), 0 2px 5px rgba(14, 41, 57, 0.44),
    inset 0 -1px 2px rgba(14, 41, 57, 0.15);
  opacity: 0.9;
  border-radius: 20px;
`;
