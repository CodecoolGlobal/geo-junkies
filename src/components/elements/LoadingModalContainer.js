import styled from "styled-components";

export const LoadingContainer = styled.div`
  position: fixed;
  margin: auto;
  top: 6%;
  right: 0;
  width: 90%;
  height: 89%;
  background: rgba(0, 0, 0, 0.6);
  visibility: visible;
`;

export const LoadingContent = styled.div`
  position: fixed;
  display: flex;
  width: 25%;
  height: 25%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  border: 3px solid black;
  opacity: 0.9;
  background-color: whitesmoke;
`;

export const LoadingMessage = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin: auto;
`;
