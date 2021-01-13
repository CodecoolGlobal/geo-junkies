import React, { useContext } from "react";
import NavbarContainer from "../elements/NavbarContainer";
import { UserContext } from "../../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavbarLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const NavbarLink = styled(Link)`
  color: grey;
  text-decoration: none;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  padding: 5px;
  font-weight: bold;
  font-size: 1.5em;
  letter-spacing: 0.025em;
  border-radius: 10px;
  visibility: ${(props) =>
    useLocation().pathname === props.to ? "hidden" : ""};
  &:hover {
    color: black;
  }
`;

const RegNavbarLink = styled(Link)`
  color: grey;
  text-decoration: none;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  padding: 5px;
  font-weight: bold;
  font-size: 1.5em;
  letter-spacing: 0.025em;
  border-radius: 10px;
  visibility: ${(props) => (props.user.token ? "hidden" : "")};
  &:hover {
    color: black;
  }
`;

export default function Navbar(props) {
  const user = useContext(UserContext)[0];

  return (
    <NavbarContainer>
      <NavbarLinks>
        <React.Fragment>
          <NavbarLink to="/">Home</NavbarLink>
          <RegNavbarLink user={user} to="/registration">
            Registration
          </RegNavbarLink>
          {!user.token ? (
            <NavbarLink to="/login">Login</NavbarLink>
          ) : (
            <NavbarLink to="/logout">Logout</NavbarLink>
          )}
          <NavbarLink to="/choose">Play Game</NavbarLink>
          <NavbarLink to="/scores">High Scores</NavbarLink>
          <NavbarLink to="/about">About</NavbarLink>
        </React.Fragment>
      </NavbarLinks>
    </NavbarContainer>
  );
}
