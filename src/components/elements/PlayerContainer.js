import styled from "styled-components";

const PlayersContainer = styled.div`
  margin-top: 5%;
  margin-left: 15%;
  width: 80%;
  border: 5px solid lightgrey;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  letter-spacing: 0.1em;

  .buttonBox {
    height: 10%;
    margin-bottom: -3px;

    display: flex;
    justify-content: space-around;
    align-items: flex-end;

    button {
      width: 50%;
      padding: 6px 0;
      outline: none;
      cursor: pointer;
      border: none;
      border-bottom: white solid 3px;
      border-right: white solid 3px;
      background-color: rgba(163, 163, 163);
    }

    .active {
      font-weight: 750;
      background-color: lightgrey;
    }

    #leftButton {
      border-radius: 15px 0 0;
    }

    #rightButton {
      border-radius: 0 15px 0 0;
      border-right: none;
    }

    .map-title {
      font-size: 3rem;
      text-align: center;
      color: rgb(231, 231, 195);
      text-decoration: none;
      text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
      padding: 5px;
      font-weight: bold;
      font-size: 1.5em;
    }
  }
`;

export default PlayersContainer;
