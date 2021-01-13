import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { HighScoreContext } from "../../contexts/HighScoreContext";
import mapboxgl, { LngLat } from "mapbox-gl";
import * as MapStyle from "../elements/MapContainer";
import "../../style/marker.css";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import greenMarkerImage from "../../components/images/greenmarker.png";
import redMarkerImage from "../../components/images/redmarker.png";
import { UserContext } from "../../contexts/UserContext";
import { CityContext } from "../../contexts/CityContext";

const MapBox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoia296bWFydGludXMiLCJhIjoiY2tpb2VwNW91MGh6bDJ6bWxkbzdlemUyeCJ9.JcDXIp8INuk9kw1H3BAt8Q",
  dragPan: false,
  doubleClickZoom: false,
  touchZoomRotate: false,
  scrollZoom: false,
  dragRotate: false,
});

const roundNumber = 5;

const Map = (props) => {
  const [isPointSelected, setIsPointSelected] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const cities = useContext(CityContext)[0];
  const [selectedCities, setSelectedCities] = useState(citySelector(cities));
  const [currentCity, setCurrentCity] = useState(selectedCities[currentRound]);
  const [markerLng, setMarkerLng] = useState(currentCity.longitude);
  const [markerLat, setMarkerLat] = useState(currentCity.latitude);
  const [popupMessage, setPopupMessage] = useState("");
  const [guessLng, setGuessLng] = useState(null);
  const [guessLat, setGuessLat] = useState(null);
  const [cityMarkerClass, setCityMarkerClass] = useState("hidden");

  const user = useContext(UserContext)[0];
  const [actualScore, setActualScore] = useState(0);
  const setHighScore = useContext(HighScoreContext)[1];

  let content = "";
  // <MapStyle.MapContainer>
  /* <MapStyle.UsernameContainer id="usernameContainer">
        <p>
          <MapStyle.UsernameLabel>
            Please enter your name:
          </MapStyle.UsernameLabel>
        </p>
        <p>
          <MapStyle.UsernameInput
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </p>
        <p>
          <MapStyle.SetUsernameButton
            onClick={() => {
              setUsername(document.querySelector("#username").value);
            }}
          >
            Submit
          </MapStyle.SetUsernameButton>
        </p>
      </MapStyle.UsernameContainer> */
  /* </MapStyle.MapContainer> */
  if (currentCity && user.username) {
    content = (
      <MapStyle.MapContainer>
        <MapBox
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: "680px",
            width: "800px",
            border: "1px solid grey",
          }}
          center={[currentCity.longitude_center, currentCity.latitude_center]}
          zoom={[currentCity.zoom]}
          onStyleLoad={(map, event) =>
            map.style.stylesheet.layers.forEach(function (layer) {
              if (layer.type === "symbol") {
                map.removeLayer(layer.id);
              }
            })
          }
          onClick={
            isPointSelected
              ? null
              : (map, e) => {
                  mapClickHandler(e, map);
                }
          }
        >
          <Marker
            coordinates={[markerLng, markerLat]}
            offset={-6}
            className={cityMarkerClass}
          >
            <img src={greenMarkerImage} alt="" />
          </Marker>
          <Popup
            coordinates={[markerLng, markerLat]}
            offset={48}
            className={cityMarkerClass}
          >
            <h3 class="popup">{popupMessage}</h3>
          </Popup>
          <Marker
            className={cityMarkerClass}
            coordinates={[guessLng, guessLat]}
            offset={-6}
          >
            <img src={redMarkerImage} alt="" />
          </Marker>
        </MapBox>
        <MapStyle.UserAndCityContainer>
          <MapStyle.InfoParagraph>
            Current user: <MapStyle.InfoSpan>{user.username}</MapStyle.InfoSpan>
          </MapStyle.InfoParagraph>
          <MapStyle.InfoParagraph id="theEnd">
            City Name: <MapStyle.InfoSpan>{currentCity.name}</MapStyle.InfoSpan>
          </MapStyle.InfoParagraph>
          <MapStyle.ScoreParagraph>
            Actual score: <MapStyle.InfoSpan>{actualScore}</MapStyle.InfoSpan>
          </MapStyle.ScoreParagraph>
          <MapStyle.NextCityButton
            id="clearButton"
            className={cityMarkerClass}
            onClick={(map, e) => buttonHandler()}
          >
            Next City
          </MapStyle.NextCityButton>
          <Link to="/">
            <MapStyle.NextCityButton id="endGameButton" className="displayNone">
              Finish Game
            </MapStyle.NextCityButton>
          </Link>
        </MapStyle.UserAndCityContainer>
      </MapStyle.MapContainer>
    );
  }

  const mapClickHandler = (e, map) => {
    const city = new mapboxgl.LngLat(
      currentCity.longitude,
      currentCity.latitude
    );
    let distance = Math.round(city.distanceTo(e.lngLat) / 1000);
    let message = distance + " km away.";
    setPopupMessage(message);
    setGuessLng(e.lngLat.lng);
    setGuessLat(e.lngLat.lat);
    setCityMarkerClass("show");
    setIsPointSelected(true);
    let score =
      // currentCity.handicap - distance > 0 ? currentCity.handicap - distance : 0;
      currentCity.handicap - distance > 0
        ? Math.round(
            ((currentCity.handicap - distance) / currentCity.handicap) * 1000
          )
        : 0;

    setActualScore(actualScore + score);
  };

  const buttonHandler = () => {
    setCityMarkerClass("hidden");
    setCurrentRound(currentRound + 1);
    if (currentRound + 1 < 5) {
      setIsPointSelected(false);
      setCurrentCity(selectedCities[currentRound + 1]);
      setMarkerLng(selectedCities[currentRound + 1].longitude);
      setMarkerLat(selectedCities[currentRound + 1].latitude);
    } else {
      setHighScore((prevScore) => [
        ...prevScore,
        { name: user.username, score: actualScore },
      ]);
      document.querySelector("#theEnd").innerHTML = "THE END";
      document.querySelector("#endGameButton").classList.remove("displayNone");
    }
  };

  return content;
};

function citySelector(cities) {
  let selectedCities = [];
  while (selectedCities.length < roundNumber) {
    let cityIndex = Math.floor(Math.random() * cities.length);
    let actualCity = cities[cityIndex];
    if (!selectedCities.includes(actualCity)) {
      selectedCities.push(actualCity);
    }
  }
  return selectedCities;
}

export default Map;
