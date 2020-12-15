import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

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

        let marker = null;
        document
          .querySelector("#clearButton")
          .addEventListener("click", function () {
            marker.remove();
          });

        map.on("click", function (e) {
          console.log(JSON.stringify(e.lngLat.wrap()));
          if (marker) {
            marker.remove();
          }
          marker = new mapboxgl.Marker()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
        });
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />;
      <button id="clearButton">Evaluate</button>
    </div>
  );
};

export default Map;
