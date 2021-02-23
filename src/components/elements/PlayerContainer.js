import styled from "styled-components";
import settingsCog from "../images/settings-cog.png";
import hoverSettingsCog from "../images/settings-cog-hover.png";
import img from "../images/export2.jpg";

export const PlayersContainer = styled.div`
  margin-top: 2%;
  margin-left: 15%;
  margin-bottom: 10%;
  width: 70%;
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
  }

  button {
    width: 50%;
    padding: 6px 0;
    outline: none;
    cursor: pointer;
    border: none;
    background-color: black;
    text-shadow: 2px 2px;
    margin: 5px;
    box-shadow: 2px 2px 4px #000000;
  }

  .active {
    font-weight: 750;
    background-color: green;
  }

  .map-title {
    text-align: center;
    color: white;
    text-decoration: none;
    text-shadow: none;
    padding: 5px;
    font-weight: bold;
    font-size: 1.5em;
  }

  .title {
    text-align: center;
    color: rgba(228, 238, 34, 0.92);
    text-decoration: none;
    text-shadow: 2px 2px 4px #000000;
    padding: 5px;
    font-weight: bold;
    font-size: 2.5rem;
    border-radius: 10px;
  }

  .user {
    text-align: center;
    color: #fefaeb;
    text-decoration: none;
    text-shadow: 2px 2px 4px #000000;
    padding: 10px;
    font-weight: bold;
    font-size: 2.5rem;
    background-color: #4b4e57;
  }

  .me {
    position: absolute;
    display: inline-block;
    text-align: center;
    top: 7%;
    left: 55%;
    transform: translate(-97%, -45%);
    background-color: lightgray;
    text-shadow: 2px 2px 4px #000000;
    padding: 5px;
    font-weight: bold;
    font-size: 1.5rem;
    /* border-radius: 10px; */
    width: 7vw;
    height: 7vw;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .table-container {
    margin: 0px;
    background-color: #4b4e57;
    border: 1px solid black;
    text-align: center;
    min-height: 50vh;
    max-height: 50vh;
    display: inline-grid;
    overflow-y: auto;
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
      border-radius: 5px;
    }
  }

  table {
    text-align: center;
    border: none;
    align-content: center;
    background-color: #4b4e57;
  }

  thead {
    font-size: 1em;
    text-align: center;
    color: rgba(228, 238, 34, 0.92);
    text-decoration: none;
    text-shadow: 2px 2px 4px #000000;
    padding: 5px;
    font-weight: bold;
    font-size: 2em;
    border-radius: 10px;
  }

  td {
    font-size: 1.25rem;
    font-weight: bold;
    padding: 1%;
    color: #a9acb5;
  }

  tbody {
    text-align: center;
    text-shadow: 2px 2px 4px #000000;
    overflow-y: scroll;
  }

  .left-row {
    text-align: right;
    width: 35%;
    overflow: visible;
  }

  .center-row {
    width: 30%;
    overflow: hidden;
  }

  .right-row {
    text-align: left;
    width: 35%;
  }

  .date {
    padding-left: 5px;
  }
  .ribbon {
    max-height: 1.25em;
    padding: 0px 10px 0px 10px;
    word-break: keep-all;
  }

  tbody .center-row:hover {
    transform: scale(1.25);
  }

  .settings-icon {
    display: inline-block;
    background-image: url(${settingsCog});
    background-size: cover;
    height: 20px;
    width: 20px;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .settings-icon:hover {
    background-image: url(${hoverSettingsCog});
  }

  #download {
    height: 25px;
    width: 25px;
    background-image: url(${img});
    background-size: cover;
    background-repeat: no-repeat;
    padding: 0;
    margin-right: 20px;
  }
`;
