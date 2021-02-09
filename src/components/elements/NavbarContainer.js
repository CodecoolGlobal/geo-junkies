import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 6%;
  width: 10%;
  min-height: 89%;
  background-color: black;
  opacity: 0.9;
  z-index: 999;
  border: 1px solid black;
  @media screen and (max-width: 1520px) {
    font-size: 0.9em;
  }
  @media screen and (max-width: 1400px) {
    font-size: 0.8em;
  }
  @media screen and (max-width: 1300px) {
    font-size: 0.75em;
  }
  @media screen and (max-width: 1200px) {
    font-size: 0.7em;
  }
  @media screen and (max-width: 1100px) {
    font-size: 0.65em;
  }
  @media screen and (max-width: 1000px) {
    font-size: 0.6em;
    min-width: 100px;
  }
`;

export default NavbarContainer;
