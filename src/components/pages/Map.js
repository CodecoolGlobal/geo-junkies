import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import APIs from "../files/ApiRequestURL.json";
import Countdown from "react-countdown";
// eslint-disable-next-line no-unused-vars
import mapboxgl, { clearStorage, LngLat } from "mapbox-gl";
// eslint-disable-next-line no-unused-vars
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";

import { UserContext } from "../../contexts/UserContext";
import { CityContext } from "../../contexts/CityContext";
import { ActualMapContext } from "../../contexts/ActualMapContext";
import UsePostData from "../../hooks/UsePostData";

import * as MapStyle from "../elements/MapContainer";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../style/Marker.css";
import greenMarkerImage from "../../components/images/greenmarker.png";
import redMarkerImage from "../../components/images/redmarker.png";
import EndGameModal from "../layout/EndGameModal";
import StartGameModal from "../layout/StartGameModal";
import LoadingGameModal from "../layout/LoadingGameModal";
import TimeOverModal from "../layout/TimeOverModal";

const MapBox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoia296bWFydGludXMiLCJhIjoiY2tpb2VwNW91MGh6bDJ6bWxkbzdlemUyeCJ9.JcDXIp8INuk9kw1H3BAt8Q",
  dragPan: false,
  doubleClickZoom: false,
  touchZoomRotate: false,
  scrollZoom: false,
  dragRotate: false,
});

const maxRoundNumber = 5;

const Map = (props) => {
  const [isPointSelected, setIsPointSelected] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const cities = useContext(CityContext)[0];
  const actualMap = useContext(ActualMapContext)[0];
  const selectedCities = useState(citySelector(cities))[0];
  const [currentCity, setCurrentCity] = useState(selectedCities[0]);
  const [markerLng, setMarkerLng] = useState(currentCity.longitude);
  const [markerLat, setMarkerLat] = useState(currentCity.latitude);
  const [popupMessage, setPopupMessage] = useState("");
  const [guessLng, setGuessLng] = useState(null);
  const [guessLat, setGuessLat] = useState(null);
  const [cityMarkerClass, setCityMarkerClass] = useState("hidden");
  const user = useContext(UserContext)[0];
  const [actualScore, setActualScore] = useState(0);
  const [endModalState, setEndModalState] = useState(false);
  const [startModalState, setStartModalState] = useState(true);
  const [timeOverModalState, setTimeOverModalState] = useState(false);
  const [nextButtonText, setNextButtonText] = useState("Next City");
  const [highscores, setHighscores] = useState([]);
  const [isMapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${APIs.highscores}/${actualMap.id}`)
      .then((result) =>
        setHighscores(result.data.highscores.map((data) => data.score))
      );
  }, [actualMap.id]);

  let content = "";
  if (currentCity && user.username) {
    content = (
      <MapStyle.MapContainer
        style={{ visibility: isMapLoading ? "hidden" : "visible" }}
      >
        <MapBox
          // eslint-disable-next-line react/style-prop-object
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
              setMapLoading(false);
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
            // eslint-disable-next-line
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
          <MapStyle.MapDataContainer>
            <h3 style={{ fontWeight: 100 }}>
              <MapStyle.InfoSpan>{actualMap.name}</MapStyle.InfoSpan>
            </h3>
            <MapStyle.InfoParagraph>
              Current handicap:{" "}
              <MapStyle.InfoSpan>{actualMap.handicap}</MapStyle.InfoSpan>
            </MapStyle.InfoParagraph>
            <MapStyle.InfoParagraph>
              Username: <MapStyle.InfoSpan>{user.username}</MapStyle.InfoSpan>
            </MapStyle.InfoParagraph>
          </MapStyle.MapDataContainer>
          <MapStyle.ActualInfoContainer>
            <MapStyle.CountDownContainer>
              Time left:{" "}
              {startModalState ? (
                ""
              ) : (
                <Countdown
                  key={currentRoundIndex}
                  date={Date.now() + 10000}
                  precision={0}
                  renderer={(props) => props.seconds}
                  onComplete={() => countdownHandler()}
                />
              )}
            </MapStyle.CountDownContainer>
            <MapStyle.InfoParagraph>
              Round:{" "}
              <MapStyle.InfoSpan>{currentRoundIndex + 1}</MapStyle.InfoSpan>
            </MapStyle.InfoParagraph>
            <MapStyle.ScoreParagraph>
              Actual score: <MapStyle.InfoSpan>{actualScore}</MapStyle.InfoSpan>
            </MapStyle.ScoreParagraph>
            <MapStyle.InfoParagraph id="theEnd">
              City Name:{" "}
              <MapStyle.InfoSpan>
                {startModalState ? "" : currentCity.name}
              </MapStyle.InfoSpan>
            </MapStyle.InfoParagraph>
            <MapStyle.NextCityButton
              id="clearButton"
              className={cityMarkerClass}
              onClick={(map, e) => buttonHandler()}
            >
              {nextButtonText}
            </MapStyle.NextCityButton>
          </MapStyle.ActualInfoContainer>
        </MapStyle.UserAndCityContainer>

        <EndGameModal
          modalState={endModalState}
          highscores={highscores}
          actualScore={actualScore}
        />
        <StartGameModal
          startModalState={startModalState}
          setStartModalState={setStartModalState}
        />
        <TimeOverModal timeOverModalState={timeOverModalState} />
        {isMapLoading ? <LoadingGameModal /> : ""}
      </MapStyle.MapContainer>
    );
  }

  const mapClickHandler = (e, map) => {
    setGuessLng(e.lngLat.lng);
    setGuessLat(e.lngLat.lat);
    const city = new mapboxgl.LngLat(markerLng, markerLat);
    const distance = Math.round(city.distanceTo(e.lngLat) / 1000);
    const message = distance + " km away.";
    setPopupMessage(message);
    setCityMarkerClass("show");
    setIsPointSelected(true);
    let score =
      currentCity.handicap - distance > 0
        ? Math.round(
            ((currentCity.handicap - distance) / currentCity.handicap) * 1000
          )
        : 0;
    setActualScore(actualScore + score);
  };

  const buttonHandler = () => {
    setCityMarkerClass("hidden");
    if (currentRoundIndex + 1 < maxRoundNumber) {
      const increasedCurrentRoundIndex = currentRoundIndex + 1;
      const newCity = selectedCities[increasedCurrentRoundIndex];
      setCurrentRoundIndex(increasedCurrentRoundIndex);
      setCurrentCity(newCity);
      setMarkerLng(newCity.longitude);
      setMarkerLat(newCity.latitude);
      setIsPointSelected(false);
    } else {
      UsePostData(
        APIs.highscores,
        user.token,
        { map: actualMap.id, score: actualScore },
        (response) => {
          if (response.status === 200) {
          }
        }
      );
      setEndModalState(true);
    }

    if (currentRoundIndex === maxRoundNumber - 2) {
      setNextButtonText("Finish");
    }
  };

  const countdownHandler = () => {
    if (cityMarkerClass === "hidden" && !endModalState) {
      return setTimeOverModalState(true);
    }
    buttonHandler();
  };

  return content;
};

function citySelector(cities) {
  let selectedCities = [];
  while (selectedCities.length < maxRoundNumber) {
    let cityIndex = Math.floor(Math.random() * cities.length);
    let actualCity = cities[cityIndex];
    if (!selectedCities.includes(actualCity)) {
      selectedCities.push(actualCity);
    }
  }
  return selectedCities;
}

export default Map;
