import React from "react";
import * as StartModal from "../elements/StartModalContainer";

const StartGameModal = (props) => {
  return (
    <StartModal.ModalContainer
      style={{ display: props.startModalState ? "block" : "none" }}
    >
      <StartModal.ModalContent>
        <StartModal.StartGameButton
          onClick={(e) => handleStartClick(e, props.setStartModalState)}
        >
          Start Game
        </StartModal.StartGameButton>
      </StartModal.ModalContent>
    </StartModal.ModalContainer>
  );
};

export default StartGameModal;

function handleStartClick(event, setStartModalState) {
  setStartModalState(false);
}
