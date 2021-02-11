import React, { useContext } from "react";
import NavbarContainer from "../elements/NavbarContainer";
import { UserContext } from "../../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import "../../style/Navbar.css";

const NavbarLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

// text-shadow: ${(props) =>
//   useLocation().pathname === props.to
//     ? "-1px 0 grey, 0 1px grey, 1px 0 grey, 0 -1px grey"
//     : "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"};
// border-radius: 16px;
// border: 1px solid black;

const NavbarLink = styled(Link)`
  color: ${(props) => (useLocation().pathname === props.to ? "grey" : "white")};
  text-decoration: none;
  padding: 5px;
  font-weight: bold;
  font-size: 1.2em;
  letter-spacing: 0.025em;
  pointer-events: ${(props) =>
    useLocation().pathname === props.to ? "none" : ""};
  &:hover {
    color: green;
  }
`;

export default function Navbar(props) {
  const user = useContext(UserContext)[0];

  return (
    <NavbarContainer>
      <NavbarLinks>
        <React.Fragment>
          <NavbarLink to="/">Home</NavbarLink>
          <NavbarLink to="/registration">Registration</NavbarLink>
          {!user.token ? (
            <NavbarLink to="/login">Login</NavbarLink>
          ) : (
            <NavbarLink to="/logout">Logout</NavbarLink>
          )}

          <NavbarLink to="/choose" className={user.token ? "" : "set-disabled"}>
            Play Game
          </NavbarLink>
          <NavbarLink
            to="/profile"
            className={user.token ? "" : "set-disabled"}
          >
            My profile
          </NavbarLink>
          <NavbarLink to="/scores">High Scores</NavbarLink>
          <NavbarLink to="/about">About</NavbarLink>
        </React.Fragment>
      </NavbarLinks>
    </NavbarContainer>
  );
}
