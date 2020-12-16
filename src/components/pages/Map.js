import React, { useEffect, useState, useRef, useContext } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import MapContainer from "../elements/MapContainer";
import "../../style/marker.css";
import data from "../files/europeanCities.json";
import styled from "styled-components";

const SetUsernameButton = styled.button`
  border-radius: 10px;
  width: 80px;
  padding: 5px;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  margin-top: 10px;
`;

const UsernameLabel = styled.label`
  font-size: 1em;
`;

const UsernameInput = styled.input`
  font-size: 1em;
  margin-top: 5px;
  border-radius: 5px;
  padding-left: 3px;
  outline: none;
`;

const UsernameContainer = styled.div`
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
`;

const styles = {
  width: "80vw",
  height: "calc(100vh - 180px)",
  // position: "absolute",
};

let isPointSelected = false;

const Map = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [username, setUsername] = useState(null);

  let selectedCities = [];
  while (selectedCities.length < 5) {
    let cityIndex = Math.floor(Math.random() * data.european_cities.length);
    let actualCity = data.european_cities[cityIndex];
    if (!selectedCities.includes(actualCity)) {
      selectedCities.push(actualCity);
    }
  }

  const cityArray = selectedCities;

  const [currentCity, setCurrentCity] = useState(cityArray[0]);

  useEffect(() => {
    if (username) {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoia296bWFydGludXMiLCJhIjoiY2tpb2VwNW91MGh6bDJ6bWxkbzdlemUyeCJ9.JcDXIp8INuk9kw1H3BAt8Q";
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [25, 55],
          zoom: 2.75,
        });

        map.on("load", () => {
          setMap(map);
          disableInteractives(map);

          map.on("click", (e) => {
            if (isPointSelected) {
              e.preventDefault();
            } else {
              mapClickHandler(e, map, currentCity);
            }
          });
          map.resize();
        });
      };

      if (!map) initializeMap({ setMap, mapContainer });
    }
  }, [map, username]);

  if (username) {
    return (
      <MapContainer>
        <p>{currentCity.city}</p>
        <p>Current user: {username}</p>
        <div ref={(el) => (mapContainer.current = el)} style={styles} />
        <div>
          <button id="clearButton">Evaluate</button>
        </div>
      </MapContainer>
    );
  } else {
    return (
      <MapContainer>
        <UsernameContainer id="usernameContainer">
          <p>
            <UsernameLabel>Please enter your name:</UsernameLabel>
          </p>
          <p>
            <UsernameInput
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </p>
          <p>
            <SetUsernameButton
              onClick={() => {
                setUsername(document.querySelector("#username").value);
              }}
            >
              Submit
            </SetUsernameButton>
          </p>
        </UsernameContainer>
      </MapContainer>
    );
  }
};

function disableInteractives(map) {
  map.scrollZoom.disable();
  map.doubleClickZoom.disable();
  map.dragPan.disable();
  map.style.stylesheet.layers.forEach(function (layer) {
    if (layer.type === "symbol") {
      map.removeLayer(layer.id);
    }
  });
}

const mapClickHandler = (e, map, currentCity) => {
  const city = new LngLat(currentCity.longitude, currentCity.latitude);
  let message = Math.round(city.distanceTo(e.lngLat) / 1000) + " km away.";
  let guessMarker = new mapboxgl.Marker()
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(map);
  let popup = new mapboxgl.Popup({ offset: 38 })
    .setLngLat(city)
    .setHTML(`<h3 class="popup">${message}</h3>`)
    .addTo(map);
  let cityMarker = new mapboxgl.Marker({ color: "green" })
    .setLngLat(city)
    .addTo(map);

  isPointSelected = true;

  document.querySelector("#clearButton").addEventListener("click", function () {
    guessMarker.remove();
    cityMarker.remove();
    popup.remove();
    isPointSelected = false;
  });
};

export default Map;
