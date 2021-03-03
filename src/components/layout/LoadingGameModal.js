import React from "react";
import * as LoadingModal from "../elements/LoadingModalContainer";

const LoadingGameModal = (props) => {
  return (
    <LoadingModal.LoadingContainer>
      <LoadingModal.LoadingContent>
        <LoadingModal.LoadingMessage>
          LOADING MAP...
        </LoadingModal.LoadingMessage>
      </LoadingModal.LoadingContent>
    </LoadingModal.LoadingContainer>
  );
};
export default LoadingGameModal;
