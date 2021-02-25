import React from "react";
import { Link } from "react-router-dom";
import * as EndModal from "../elements/EndGameModalContainer";

const TimeOverModal = (props) => {
  return (
    <EndModal.ModalContainer
      style={{ display: props.timeOverModalState ? "block" : "none" }}
    >
      <EndModal.ModalContent>
        <EndModal.ModalTextContainer>
          <h2>THE END</h2>
          <h3>TIME IS OVER!</h3>
        </EndModal.ModalTextContainer>
        <EndModal.ButtonContainer>
          <Link to="/">
            <EndModal.EndGameButton>Back To Main</EndModal.EndGameButton>
          </Link>
          <Link to="/choose">
            <EndModal.EndGameButton>New Game</EndModal.EndGameButton>
          </Link>
        </EndModal.ButtonContainer>
      </EndModal.ModalContent>
    </EndModal.ModalContainer>
  );
};

export default TimeOverModal;
