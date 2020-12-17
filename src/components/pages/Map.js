import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { HighScoreContext } from "../../contexts/HighScoreContext";
import mapboxgl, { LngLat } from "mapbox-gl";
import * as MapStyle from "../elements/MapContainer";
import "../../style/marker.css";
import data from "../files/europeanCities.json";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import greenMarkerImage from "../../components/images/greenmarker.png";
import redMarkerImage from "../../components/images/redmarker.png";

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
// let isPointSelected = false;

const Map = (props) => {
  const [isPointSelected, setIsPointSelected] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);

  const [selectedCities, setSelectedCities] = useState(citySelector());
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

  // useEffect(() => {
  //   return ()=> {

  //   }
  // }, []);

  // useEffect(() => {
  //   setCurrentCity(selectedCities[0]);
  //   setMarkerLng(currentCity.longitude);
  //   setMarkerLat(currentCity.latitude);
  // }, []);
  // const cityArray = selectedCities;

  // useEffect(() => {
  //   // mapboxgl.accessToken =
  //   //   "pk.eyJ1Ijoia296bWFydGludXMiLCJhIjoiY2tpb2VwNW91MGh6bDJ6bWxkbzdlemUyeCJ9.JcDXIp8INuk9kw1H3BAt8Q";

  //   const initializeMap = ({ setMap, mapContainer }) => {
  //     const map = new mapboxgl.Map({
  //       container: mapContainer.current,
  //       style: "mapbox://styles/mapbox/streets-v11",
  //       center: [15,55],
  //       zoom: 2.75,
  //     });

  //     map.on("load", () => {
  //       setMap(map);
  //       disableInteractives(map);

  //       map.on("click", (e) => {
  //         if (isPointSelected) {
  //           e.preventDefault();
  //         } else {
  //           mapClickHandler(e, map, currentCity);

  //         }
  //       });
  //       map.resize();
  //     });
  //   };

  //   if (!map) initializeMap({ setMap, mapContainer });
  // }, [map, currentCity]);

  let content = (
    <MapStyle.MapContainer>
      <MapStyle.UsernameContainer id="usernameContainer">
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
      </MapStyle.UsernameContainer>
    </MapStyle.MapContainer>
  );
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
                  mapClickHandler(
                    e,
                    map,
                    currentCity,
                    setCityMarkerClass,
                    setGuessLng,
                    setGuessLat,
                    setPopupMessage,
                    setIsPointSelected,
                    actualScore,
                    setActualScore
                  );
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
            Current user: <MapStyle.InfoSpan>{username}</MapStyle.InfoSpan>
          </MapStyle.InfoParagraph>
          <MapStyle.InfoParagraph id="theEnd">
            City Name: <MapStyle.InfoSpan>{currentCity.city}</MapStyle.InfoSpan>
          </MapStyle.InfoParagraph>
          <MapStyle.ScoreParagraph>
            Actual score: <MapStyle.InfoSpan>{actualScore}</MapStyle.InfoSpan>
          </MapStyle.ScoreParagraph>
          <MapStyle.NextCityButton
            id="clearButton"
            className={cityMarkerClass}
            onClick={(map, e) =>
              buttonHandler(
                setCityMarkerClass,
                setIsPointSelected,
                currentRound,
                setCurrentRound,
                selectedCities,
                setCurrentCity,
                setMarkerLng,
                setMarkerLat,
                actualScore,
                setHighScore,
                username
              )
            }
          >
            Next City
          </MapStyle.NextCityButton>
          <Link to="/">
            <button id="endGameButton" className="hidden">
              Finish Game
            </button>
          </Link>
        </MapStyle.UserAndCityContainer>
      </MapStyle.MapContainer>
    );
  }

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

const mapClickHandler = (
  e,
  map,
  currentCity,
  setCityMarkerClass,
  setGuessLng,
  setGuessLat,
  setPopupMessage,
  setIsPointSelected,
  actualScore,
  setActualScore
) => {
  const city = new mapboxgl.LngLat(currentCity.longitude, currentCity.latitude);
  let distance = Math.round(city.distanceTo(e.lngLat) / 1000);
  let message = distance + " km away.";
  setPopupMessage(message);
  setGuessLng(e.lngLat.lng);
  setGuessLat(e.lngLat.lat);
  setCityMarkerClass("show");
  setIsPointSelected(true);
  let score = 1000 - distance > 0 ? 1000 - distance : 0;
  setActualScore(actualScore + score);
  // console.log(isPointSelected);
  // console.log(isPointSelected);

  // document.querySelector("#clearButton").addEventListener("click", function () {
  //   currentRound++;
  //   currentCity = selectedCities[currentRound];
  //   guessMarker.remove();
  //   cityMarker.remove();
  //   popup.remove();
  //   isPointSelected = false;
  // });
};

const buttonHandler = (
  setCityMarkerClass,
  setIsPointSelected,
  currentRound,
  setCurrentRound,
  selectedCities,
  setCurrentCity,
  setMarkerLng,
  setMarkerLat,
  actualScore,
  setHighScore,
  username
) => {
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
    document.querySelector("#endGameButton").classList.remove("hidden");
  }
};

export default Map;
