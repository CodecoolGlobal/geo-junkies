import React, { useEffect, useState, useRef } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import "../../style/marker.css";

const styles = {
  width: "80vw",
  height: "calc(100vh - 180px)",
  // position: "absolute",
};

const Map = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

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
        map.scrollZoom.disable();
        map.doubleClickZoom.disable();
        map.dragPan.disable();
        map.style.stylesheet.layers.forEach(function (layer) {
          if (layer.type === "symbol") {
            map.removeLayer(layer.id);
          }
        });

        let guessMarker = null;
        let cityMarker = null;
        let popup = null;
        document
          .querySelector("#clearButton")
          .addEventListener("click", function () {
            guessMarker.remove();
            cityMarker.remove();
            popup.remove();
          });

        map.on("click", function (e) {
          const budapest = new LngLat(19, 47.5);
          let message =
            Math.round(budapest.distanceTo(e.lngLat) / 1000) + " km away.";
          if (guessMarker) {
            guessMarker.remove();
          }
          guessMarker = new mapboxgl.Marker()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
          popup = new mapboxgl.Popup({ offset: 38 })
            .setLngLat(budapest)
            .setHTML(`<h3 class="popup">${message}</h3>`)
            .addTo(map);
          cityMarker = new mapboxgl.Marker({ color: "green" })
            .setLngLat(budapest)
            .addTo(map);
        });
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <div>
        <button id="clearButton">Evaluate</button>
      </div>
    </div>
  );
};

export default Map;
