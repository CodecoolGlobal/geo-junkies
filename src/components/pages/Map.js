import React, { useState, useContext } from "react";
import { HighScoreContext } from "../../contexts/HighScoreContext";
import mapboxgl from "mapbox-gl";
import * as MapStyle from "../elements/MapContainer";
import "../../style/marker.css";
import data from "../files/europeanCities.json";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import greenMarkerImage from "../../components/images/greenmarker.png";
import redMarkerImage from "../../components/images/redmarker.png";
import Username from "../layout/Username";
import MapPageCard from "../layout/MapPageCard";

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

  const selectedCities = useState(citySelector())[0];
  const [currentCity, setCurrentCity] = useState(selectedCities[currentRound]);
  const [markerLng, setMarkerLng] = useState(currentCity.longitude);
  const [markerLat, setMarkerLat] = useState(currentCity.latitude);
  const [popupMessage, setPopupMessage] = useState("");
  const [guessLng, setGuessLng] = useState(null);
  const [guessLat, setGuessLat] = useState(null);
  const [cityMarkerClass, setCityMarkerClass] = useState("hidden");
  const [username, setUsername] = useState(null);
  const [actualScore, setActualScore] = useState(0);

  const setHighScore = useContext(HighScoreContext)[1];

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
        { name: username, score: actualScore },
      ]);
      document.querySelector("#theEnd").innerHTML = "THE END";
      document.querySelector("#endGameButton").classList.remove("displayNone");
    }
  };

  let content = Username(setUsername);

  if (currentCity && username) {
    content = (
      <MapStyle.MapContainer>
        <MapBox
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: "680px",
            width: "800px",
            border: "1px solid grey",
          }}
          center={[15, 57]}
          zoom={[2.75]}
          onStyleLoad={(map) =>
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
                  mapClickHandler(e);
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
            <h3 className="popup">{popupMessage}</h3>
          </Popup>
          <Marker
            className={cityMarkerClass}
            coordinates={[guessLng, guessLat]}
            offset={-6}
          >
            <img src={redMarkerImage} alt="" />
          </Marker>
        </MapBox>

        <MapPageCard
          buttonHandler={buttonHandler}
          username={username}
          currentCity={currentCity}
          actualScore={actualScore}
          cityMarkerClass={cityMarkerClass}
        />
      </MapStyle.MapContainer>
    );
  }

  const mapClickHandler = (e) => {
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
    let score = 1000 - distance > 0 ? 1000 - distance : 0;
    setActualScore(actualScore + score);
  };

  return content;
};

function citySelector() {
  let selectedCities = [];
  while (selectedCities.length < roundNumber) {
    let cityIndex = Math.floor(Math.random() * data.european_cities.length);
    let actualCity = data.european_cities[cityIndex];
    if (!selectedCities.includes(actualCity)) {
      selectedCities.push(actualCity);
    }
  }
  return selectedCities;
}

export default Map;
