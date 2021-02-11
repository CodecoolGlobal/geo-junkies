import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  margin: auto;
  top: 6%;
  right: 0;
  width: 90%;
  height: 89%;
  background: rgba(0, 0, 0, 0.6);
`;

export const ModalContent = styled.div`
  position: fixed;
  display: flex;
  /* background: black; */
  width: 15%;
  height: 15%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* border: 2px solid black; */
  border-radius: 40px;
  opacity: 0.9;
`;

export const StartGameButton = styled.button`
  margin: auto;
  border-radius: 20px;
  padding: 10px;
  width: 180px;
  font-size: 1.2em;
  outline: none;
  letter-spacing: 0.1em;
  /* background: linear-gradient(to bottom, #22abe9 5%, #36caf0 100%); */
  background: yellow;
  box-shadow: inset 0 1px 0 0 #7bdcf4;
  /* border: 1px solid #0f799e; */
  border: 3px solid black;
  color: black;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 1px 0 #13506d;
  &:hover {
    /* background: linear-gradient(to bottom, #36caf0 5%, #22abe9 100%); */
    background: forestgreen;
    border: 3px solid white;
    color: whitesmoke;
  }
`;
