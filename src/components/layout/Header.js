import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import HeaderContainer from "../elements/HeaderContainer";

const HeaderLink = styled(Link)`
  color: ${(props) => (useLocation().pathname === props.to ? "grey" : "white")};
  text-decoration: none;
  font-weight: bold;
  pointer-events: ${(props) =>
    useLocation().pathname === props.to ? "none" : ""};
  &:hover {
    color: green;
  }
  margin: auto 0 auto 0;
`;

const HeaderLogo = styled.div`
  margin: auto 0 auto 0;
`;

const Header = (props) => {
  const user = useContext(UserContext)[0];
  return (
    <HeaderContainer>
      <React.Fragment>
        <HeaderLogo id="logo"></HeaderLogo>
        <HeaderLink
          to="/profile"
          className={user.token ? "" : "set-disabled"}
          title="See profile"
        >
          {user.username ? (
            <React.Fragment>
              <span style={{ fontWeight: "normal" }}>Logged in as </span>
              {user.username}
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
