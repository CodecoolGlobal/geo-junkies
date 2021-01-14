import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import UseGetData from "../../hooks/UseGet";
import UsePostData from "../../hooks/UsePostData";
import { CityContext } from "../../contexts/CityContext";
import APIs from "../files/ApiRequestURL.json";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "../../style/Choose.css";
import { Redirect } from "react-router-dom";
import { ActualMapContext } from "../../contexts/ActualMapContext";
import CardContainer from "../elements/CardContainer";
import "../../style/Images.css";

const ChoosePageDiv = styled.div`
  text-align: center;
`;

const Image = styled.div`
  width: 200px;
  height: 170px;
  border: 1px solid darkgrey;
  border-radius: 5px;
`;

const ChooseMapPage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const setCities = useContext(CityContext)[1];
  const setActualMap = useContext(ActualMapContext)[1];
  const [errorMessage, setErrorMessage] = useState([]);

  const mapData = UseGetData(APIs.maps, user.token, setErrorMessage)[1];

  const chooseClickHandler = (event, map) => {
    event.stopPropagation();
    UsePostData(APIs.cities, user.token, { id: map.id }, (response) => {
      setErrorMessage([]);
      if (response.status === 200) {
        setCities(response.data);
        setActualMap({ name: map.name, id: map.id, handicap: map.handicap });
        return history.push("/map");
      } else {
        Object.entries(response).forEach(([k, v]) => {
          v.forEach((value) => {
            setErrorMessage((old) => [...old, value]);
          });
        });
      }
    });
  };

  return user.token ? (
    <ChoosePageDiv>
      <div id="choose_container_div">
        <h2>Select map</h2>
        <div id="choose_stages">
          {mapData
            ? mapData.map((map, index) => (
                <CardContainer
                  key={index}
                  onClick={(e) => chooseClickHandler(e, map)}
                >
                  <p>{map.name}</p>
                  <Image id={`map-${map.id}`}></Image>
                  <p>handicap: {map.handicap}</p>
                  <p>rounds: {map.rounds}</p>
                </CardContainer>
              ))
            : ""}
        </div>
      </div>
      {errorMessage === null
        ? ""
        : errorMessage.map((data, index) => <div key={index}>{data}</div>)}
    </ChoosePageDiv>
  ) : (
    <Redirect to="/" />
  );
};

export default ChooseMapPage;
