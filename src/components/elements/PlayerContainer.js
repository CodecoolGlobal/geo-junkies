import styled from "styled-components";

const PlayersContainer = styled.div`
	margin-top: 1%;
	margin-left: 15%;
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

		button {
			width: 50%;
			padding: 6px 0;
			outline: none;
			cursor: pointer;
			border: none;
			/* border-bottom: white solid 3px;
			border-right: white solid 3px; */
			background-color: black;
			text-shadow: 2px 2px;
			margin: 5px;
			box-shadow: 2px 2px 4px #000000;
		}

		.active {
			font-weight: 750;
			background-color: green;
		}
		/* 
		#leftButton {
			border-radius: 15px 0 0;
		}

		#rightButton {
			border-radius: 0 15px 0 0;
			border-right: none;
		} */

		.map-title {
			text-align: center;
			color: rgba(228, 238, 34, 0.92);
			text-decoration: none;
			text-shadow: none;
			padding: 5px;
			font-weight: bold;
			font-size: 1.5em;
		}
	}
`;

export default PlayersContainer;
