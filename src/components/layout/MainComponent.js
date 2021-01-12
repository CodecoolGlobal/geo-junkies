import React from "react";
import MainBody from "../elements/MainBody";
import Navbar from "./Navbar";
import Content from "../elements/MainContentContainer";
import Footer from "./Footer";

import { Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import Map from "../pages/Map";
import HighScores from "../pages/HighScores";
import AboutPage from "../pages/AboutPage";

export default function MainComponent() {
  return (
    <MainBody>
      <Navbar />
      <Content>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/map" component={Map} />
        <Route path="/scores" component={HighScores} />
        <Route path="/about" component={AboutPage} />
      </Content>
      <Footer />
    </MainBody>
  );
}
