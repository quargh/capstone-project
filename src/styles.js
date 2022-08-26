import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html {
		color: white;
		font-size: 16px;
	}

	body {
		margin: 0;
		background-color: #282C34;
		font-size: 1rem;
	}

	.App {
		height: 100%;
		font-family: sans-serif;
		text-align: center;
	}

	.App-map {
		width: 100%;
		height: 100%;
	}

	.GridContainer {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 0.1fr 1.7fr;
		gap: 0 0;
		height: 100vh;
	}


	.ActionChild {
		position: relative;
		z-index: 20;
		box-shadow: 0 2px 10px black;
	}


	.MapChild {
		position: relative;
		z-index: 10;
	}

	.Map {
		position: absolute;
		top: 0;
		left: 0;
	}

	.CrossHairs {
		width:40px;
		height:40px;
		background-color: transparent;
		position: absolute;
		z-index: 30;
		top: 20px;
		left: 20px;
	}
	.CrossHairsRelativeParent{
		position:relative;
		width:40px;
		height:40px;
		background-color: white;
		border-radius: 2px;
	}
	.CrossHairsOn{
		position:absolute;
		top:6px;
		left:6px;
		z-index:10;
	}
	.CrossHairsOff{
		position:absolute;
		top:6px;
		left:6px;
		z-index:20;

	}

	.Night {
		background-color: #38414e;
		color: white;
	}

	.Day {
		background-color: #dde3e3;
		color: #444;
	}

	.TitleParent {
		display:  flex;
		align-items: center;
		justify-content: start;
		width: 100%;
		height: 80px;
	}


	.AppTitle {
		margin-bottom: 12px;
		margin-left: 25px;
		font-family: sans-serif;
		font-size: 22px;
	}

	.Brightness {
		position: absolute;
		top: 28px;
		right: 25px;
	}

	.closeBox {
		position: absolute;
		top: 28px;
		right: 70px;
	}
`;
