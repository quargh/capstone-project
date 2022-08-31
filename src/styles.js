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
		margin: 0 0 0 0;
		background-color: #282C34;
		font-size: 1rem;
	}

	.GoogleMap {
		height: 100%;
		font-family: sans-serif;
		text-align: center;
	}

	.GoogleMap--Day {
		background-color: #a3c7df;
	}

	.GoogleMap--Night {
		background-color: #17263c;
	}

	.App-map {
		width: 100%;
		height: 100%;
	}

	.GridContainer {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 0.05fr 1fr;
		gap: 0;
		height: calc(var(--vh, 1vh) * 100);
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
		z-index: 170;
		top: 0;
		left: 0;

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
		display: flex;
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
		cursor: pointer;
	}

	.CrossHairs {
		position: absolute;
		top: 20px;
		left: 20px;
	}

	.Plus {
		position: absolute;
		right: 20px;
		bottom: 72px;
	}

	.Minus {
		position: absolute;
		right: 20px;
		bottom: 32px;
	}
`;
