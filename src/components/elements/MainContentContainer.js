import styled from "styled-components";

const Content = styled.div`
  position: fixed;
  top: 6%;
  right: 0;
  width: 90%;
  height: 89%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: black;
    border: 1px solid black;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border: 1px solid black;
  }
`;

export default Content;
