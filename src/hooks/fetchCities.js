import { useEffect, useContext } from "react";
import data from "../components/files/europeanCities.json";
import { CityContext } from "../contexts/CityContext";

const GetCities = () => {
  const setCities = useContext(CityContext)[1];
  useEffect(() => {
    let selectedCities = [];
    while (selectedCities.length < 5) {
      let cityIndex = Math.floor(Math.random() * data.european_cities.length);
      let actualCity = data.european_cities[cityIndex];
      if (!selectedCities.includes(actualCity)) {
        selectedCities.push(actualCity);
      }
    }
    setCities(selectedCities);
  }, []);
};

export default GetCities;
