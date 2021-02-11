import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import HeaderContainer from "../elements/HeaderContainer";

const HeaderLink = styled(Link)`
  color: ${(props) =>
    useLocation().pathname === props.to ? "grey" : "yellow"};
  text-decoration: none;
  font-weight: bold;
  pointer-events: ${(props) =>
    useLocation().pathname === props.to ? "none" : ""};
  margin: auto 0 auto 0;
  &:hover {
    color: green;
  }
`;

const LogoContainer = styled.div`
  display: flex;
`;

const HeaderLogo = styled.div`
  margin: auto 0 auto 0;
`;

const HeaderLogoText = styled.div`
  margin: auto;
  font-weight: bold;
  color: #2be02b;
`;

const Header = (props) => {
  const user = useContext(UserContext)[0];
  return (
    <HeaderContainer>
      <React.Fragment>
        <LogoContainer>
          <HeaderLogo id="logo"></HeaderLogo>
          <HeaderLogoText>G e o&nbsp;&nbsp;G u e s s e R</HeaderLogoText>
        </LogoContainer>

        <HeaderLink
          to="/profile"
          className={user.token ? "" : "set-disabled"}
          title="See profile"
        >
          {user.username ? (
            <React.Fragment>
              <span style={{ fontWeight: "normal" }}>Logged in as </span>
              <span>{user.username}</span>
            </React.Fragment>
          ) : (
            "Not Logged in"
          )}
        </HeaderLink>
      </React.Fragment>
    </HeaderContainer>
  );
};
export default Header;
