import React from "react";
import * as MapStyle from "../elements/MapContainer";
import { Link } from "react-router-dom";

const MapPageCard = (props) => {
  return (
    <MapStyle.UserAndCityContainer>
      <MapStyle.InfoParagraph>
        Current user: <MapStyle.InfoSpan>{props.username}</MapStyle.InfoSpan>
      </MapStyle.InfoParagraph>
      <MapStyle.InfoParagraph id="theEnd">
        City Name:{" "}
        <MapStyle.InfoSpan>{props.currentCity.city}</MapStyle.InfoSpan>
      </MapStyle.InfoParagraph>
      <MapStyle.ScoreParagraph>
        Actual score: <MapStyle.InfoSpan>{props.actualScore}</MapStyle.InfoSpan>
      </MapStyle.ScoreParagraph>
      <MapStyle.NextCityButton
        id="clearButton"
        className={props.cityMarkerClass}
        onClick={() => props.buttonHandler()}
      >
        Next City
      </MapStyle.NextCityButton>
      <Link to="/">
        <MapStyle.NextCityButton id="endGameButton" className="displayNone">
          Finish Game
        </MapStyle.NextCityButton>
      </Link>
    </MapStyle.UserAndCityContainer>
  );
};

export default MapPageCard;
