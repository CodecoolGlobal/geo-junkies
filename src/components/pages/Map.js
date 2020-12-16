import React, { useEffect, useState, useRef, useContext } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import MapContainer from "../elements/MapContainer";
import "../../style/marker.css";
import data from "../files/europeanCities.json";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoia296bWFydGludXMiLCJhIjoiY2tpb2VwNW91MGh6bDJ6bWxkbzdlemUyeCJ9.JcDXIp8INuk9kw1H3BAt8Q",
  dragPan: false,
  doubleClickZoom: false,
  touchZoomRotate: false,
  scrollZoom: false,
  dragRotate: false,
});

let isPointSelected = false;
const roundNumber = 5;
let currentRound = 0;

const Map = (props) => {
  const [selectedCities, setSelectedCities] = useState(citySelector());
  const [currentCity, setCurrentCity] = useState(selectedCities[currentRound]);
  const [markerLng, setMarkerLng] = useState(currentCity.longitude);
  const [markerLat, setMarkerLat] = useState(currentCity.latitude);
  const [popupMessage, setPopupMessage] = useState("");
  const [guessLng, setGuessLng] = useState(null);
  const [guessLat, setGuessLat] = useState(null);
  const [cityMarkerClass, setCityMarkerClass] = useState("hidden");

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

  let content = "LOADING";
  if (currentCity) {
    content = (
      <MapContainer>
        <p>{currentCity.city}</p>
        <MapBox
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: "680px",
            width: "800px",
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
          onClick={(map, e) =>
            mapClickHandler(
              e,
              map,
              currentCity,
              setCityMarkerClass,
              setGuessLng,
              setGuessLat,
              setPopupMessage
            )
          }
        >
          <Marker
            coordinates={[markerLng, markerLat]}
            offset={-6}
            className={cityMarkerClass}
          >
            <img
              src="https://img.icons8.com/color/48/000000/marker.png"
              alt=""
            />
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
            <img
              src="https://img.icons8.com/color/48/000000/marker.png"
              alt=""
            />
          </Marker>
        </MapBox>
        <div>
          <button id="clearButton" className={cityMarkerClass}>
            Next City
          </button>
        </div>
      </MapContainer>
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
  setPopupMessage
) => {
  const city = new mapboxgl.LngLat(currentCity.longitude, currentCity.latitude);
  let message = Math.round(city.distanceTo(e.lngLat) / 1000) + " km away.";
  setPopupMessage(message);
  setGuessLng(e.lngLat.lng);
  setGuessLat(e.lngLat.lat);
  setCityMarkerClass("show");

  isPointSelected = true;

  // document.querySelector("#clearButton").addEventListener("click", function () {
  //   currentRound++;
  //   currentCity = selectedCities[currentRound];
  //   guessMarker.remove();
  //   cityMarker.remove();
  //   popup.remove();
  //   isPointSelected = false;
  // });
};

export default Map;
