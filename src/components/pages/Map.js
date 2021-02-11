import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import mapboxgl, { LngLat } from "mapbox-gl";
import * as MapStyle from "../elements/MapContainer";
import "../../style/Marker.css";
// eslint-disable-next-line no-unused-vars
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import greenMarkerImage from "../../components/images/greenmarker.png";
import redMarkerImage from "../../components/images/redmarker.png";
import { UserContext } from "../../contexts/UserContext";
import { CityContext } from "../../contexts/CityContext";
import { ActualMapContext } from "../../contexts/ActualMapContext";
import UsePostData from "../../hooks/UsePostData";
import APIs from "../files/ApiRequestURL.json";
import EndGameModal from "../layout/EndGameModal";
import StartGameModal from "../layout/StartGameModal";
import Countdown from "react-countdown";

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
  const [currentCity, setCurrentCity] = useState(
    selectedCities[currentRoundIndex]
  );
  const [markerLng, setMarkerLng] = useState(currentCity.longitude);
  const [markerLat, setMarkerLat] = useState(currentCity.latitude);
  const [popupMessage, setPopupMessage] = useState("");
  const [guessLng, setGuessLng] = useState(null);
  const [guessLat, setGuessLat] = useState(null);
  const [cityMarkerClass, setCityMarkerClass] = useState("hidden");
  const user = useContext(UserContext)[0];
  const [actualScore, setActualScore] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [startModalState, setStartModalState] = useState(true);
  const [nextButtonText, setNextButtonText] = useState("Next City");
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    axios
      .get(`${APIs.highscores}/${actualMap.id}`)
      .then((result) =>
        setHighscores(result.data.highscores.map((data) => data.score))
      );
  }, [actualMap.id]);

  /* eslint "react/no-unknown-property": 0 */
  let content = "";
  if (currentCity && user.username) {
    content = (
      <MapStyle.MapContainer>
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
                  onComplete={(e) => countdownHandler()}
                />
              )}
            </MapStyle.CountDownContainer>
            <MapStyle.InfoParagraph>
              Round:{" "}
              <MapStyle.InfoSpan>
                {currentRoundIndex > 4 ? 5 : currentRoundIndex + 1}
              </MapStyle.InfoSpan>
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
          modalState={modalState}
          highscores={highscores}
          actualScore={actualScore}
        />
        <StartGameModal
          startModalState={startModalState}
          setStartModalState={setStartModalState}
        />
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
      currentCity.handicap - distance > 0
        ? Math.round(
            ((currentCity.handicap - distance) / currentCity.handicap) * 1000
          )
        : 0;

    setActualScore(actualScore + score);
  };

  const buttonHandler = () => {
    setCityMarkerClass("hidden");
    setCurrentRoundIndex(currentRoundIndex + 1);
    if (currentRoundIndex + 1 < 5) {
      setIsPointSelected(false);
      setCurrentCity(selectedCities[currentRoundIndex + 1]);
      setMarkerLng(selectedCities[currentRoundIndex + 1].longitude);
      setMarkerLat(selectedCities[currentRoundIndex + 1].latitude);
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
      setModalState(true);
    }

    if (currentRoundIndex === maxRoundNumber - 2) {
      setNextButtonText("Finish");
    }
  };

  const countdownHandler = (e) => {
    setCityMarkerClass("hidden");
    if (currentRoundIndex + 1 < maxRoundNumber) {
      setCurrentRoundIndex(currentRoundIndex + 1);
      setIsPointSelected(false);
      setCurrentCity(selectedCities[currentRoundIndex + 1]);
      setMarkerLng(selectedCities[currentRoundIndex + 1].longitude);
      setMarkerLat(selectedCities[currentRoundIndex + 1].latitude);
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
      setModalState(true);
    }

    if (currentRoundIndex === 3) {
      setNextButtonText("Finish");
    }
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
