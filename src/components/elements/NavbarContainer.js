import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  width: 10%;
  min-height: 50%;
  background-color: lightgrey;
  opacity: 0.6;
  z-index: 9999;
  border-radius: 0 0 20px 0;
  border: 1px solid darkgrey;
`;

export default NavbarContainer;
