import React, { useEffect, useState, useRef } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import "../../style/marker.css";

const styles = {
  width: "80vw",
  height: "calc(100vh - 180px)",
  // position: "absolute",
};

let isPointSelected = false;

const Map = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const cityArray = [
    {
      city: "Tirana",
      latitude: "41.33",
      longitude: "19.82",
    },
    {
      city: "Andorra la Vella",
      latitude: "42.5",
      longitude: "1.5",
    },
    {
      city: "Yerevan",
      latitude: "40.1814",
      longitude: "44.5144",
    },
    {
      city: "Wien",
      latitude: "48.2083",
      longitude: "16.3731",
    },
    {
      city: "Graz",
      latitude: "47.0667",
      longitude: "15.4333",
    },
  ];

  const [currentCity, setCurrentCity] = useState(cityArray[0]);

  useEffect(() => {
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
  }, [map]);

  return (
    <div>
      <p>{currentCity.city}</p>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <div>
        <button id="clearButton">Evaluate</button>
      </div>
    </div>
  );
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
