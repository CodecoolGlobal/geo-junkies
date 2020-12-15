import { CityContext } from "../contexts/CityContext";
import { useContext } from "react";

export const GetCities = () => {
  const setCities = useContext(CityContext)[1];

  var cityData = require("../components/files/europeanCities.json")
    .european_cities;
  setCities(cityData);
};

export default GetCities;
