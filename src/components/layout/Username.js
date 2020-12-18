import React from "react";
import * as MapStyle from "../elements/MapContainer";

const Username = (setUsername) => {
  return (
    <MapStyle.MapContainer>
      <MapStyle.UsernameContainer id="usernameContainer">
        <p>
          <MapStyle.UsernameLabel>
            Please enter your name:
          </MapStyle.UsernameLabel>
        </p>
        <p>
          <MapStyle.UsernameInput
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </p>
        <p>
          <MapStyle.SetUsernameButton
            onClick={() => {
              setUsername(document.querySelector("#username").value);
            }}
          >
            Submit
          </MapStyle.SetUsernameButton>
        </p>
      </MapStyle.UsernameContainer>
    </MapStyle.MapContainer>
  );
};

export default Username;
