import styled from "styled-components";

export const ModalTextContainer = styled.div`
  padding: 5%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-evenly;
  bottom: 20px;
`;

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
  background: white;
  width: 30%;
  height: 30%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
  border-radius: 15px;
`;

export const EndGameButton = styled.button`
  border-radius: 5px;
  padding: 5px;
  width: 180px;
  font-size: 1em;
  outline: none;
  letter-spacing: 0.1em;
  background: linear-gradient(to bottom, #22abe9 5%, #36caf0 100%);
  box-shadow: inset 0 1px 0 0 #7bdcf4;
  border: 1px solid #0f799e;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 1px 0 #13506d;
  &:hover {
    background: linear-gradient(to bottom, #36caf0 5%, #22abe9 100%);
  }
`;
