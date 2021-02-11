import React from "react";
import MainBody from "../elements/MainBody";
import Navbar from "./Navbar";
import Content from "../elements/MainContentContainer";
import Footer from "./Footer";
import Header from "./Header";

import { Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import Map from "../pages/Map";
import ProfilePage from "../pages/ProfilePage";
import HighScores from "../pages/HighScores";
import AboutPage from "../pages/AboutPage";
import ChooseMapPage from "../pages/ChooseMapPage";

export default function MainComponent() {
  return (
    <MainBody>
      <Header />
      <Navbar />
      <Content>
        <Route exact path="/" component={MainPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/choose" component={ChooseMapPage} />
        <Route path="/map" component={Map} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/scores" component={HighScores} />
        <Route path="/about" component={AboutPage} />
      </Content>
      <Footer />
    </MainBody>
  );
}
