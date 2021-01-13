import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import UseGetData from "../../hooks/UseGet";
import UsePostData from "../../hooks/UsePostData";
import { CityContext } from "../../contexts/CityContext";
import APIs from "../files/ApiRequestURL.json";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ChoosePageDiv = styled.div`
  text-align: center;
`;

const ChooseMapPage = (props) => {
  const history = useHistory();
  const user = useContext(UserContext)[0];
  const setCities = useContext(CityContext)[1];
  const [errorMessage, setErrorMessage] = useState([]);

  const mapData = UseGetData(APIs.maps, user.token, setErrorMessage)[1];

  const chooseClickHandler = (event, id) => {
    event.stopPropagation();
    UsePostData(APIs.cities, user.token, { id: id }, (response) => {
      setErrorMessage([]);
      if (response.status === 200) {
        setCities(response.data);
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

  return (
    <ChoosePageDiv>
      {mapData
        ? mapData.map((map, index) => (
            <div key={index} onClick={(e) => chooseClickHandler(e, map.id)}>
              {map.name}
            </div>
          ))
        : ""}
      {errorMessage === null
        ? ""
        : errorMessage.map((data, index) => <div key={index}>{data}</div>)}
    </ChoosePageDiv>
  );
};

export default ChooseMapPage;
