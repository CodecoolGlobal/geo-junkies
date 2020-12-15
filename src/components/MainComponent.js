import React from "react";
import { Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MainBody from "../components/elements/MainBody";
import Map from "./pages/Map";

export default function MainComponent() {
  return (
    <MainBody>
      <Navbar />
      <Route exact path="/" component={MainPage} />
      <Route path="/map" component={Map} />
      <Footer />
    </MainBody>
  );
}
