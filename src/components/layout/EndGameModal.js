import React from "react";
import { Link } from "react-router-dom";
import * as EndModal from "../elements/EndGameModalContainer";

const EndGameModal = (props) => {
  return (
    <EndModal.ModalContainer
      style={{ display: props.modalState ? "block" : "none" }}
    >
      <EndModal.ModalContent>
        {Math.min(...props.highscores) < props.actualScore ? (
          <EndModal.ModalTextContainer>
            <h1>CONGRATULATIONS!</h1>
            <h2>YOU ACHIEVED A HIGHSCORE!</h2>
          </EndModal.ModalTextContainer>
        ) : (
          <EndModal.ModalTextContainer>
            <h2>THE END</h2>
            <h3>You collected {props.actualScore} points in this game.</h3>
          </EndModal.ModalTextContainer>
        )}
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

export default EndGameModal;
