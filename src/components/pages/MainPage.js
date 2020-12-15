import React, { useContext } from "react";
import GetCities from "../../hooks/fetchCities";
import { CityContext } from "../../contexts/CityContext";

export default function MainPage() {
  GetCities();
  const cities = useContext(CityContext)[0];

  return <div></div>;
}
