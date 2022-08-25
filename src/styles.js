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
		font-size: 1rem;
		background-color: #282C34;
	}

	.App {
		font-family: sans-serif;
		text-align: center;
		height: 100%;
	}

	.App-map {
		height: 100%;
		width: 100%;
	}

	.GridContainer {
		display: grid;
		grid-template-columns: 1fr;
		//grid-template-rows: 80px 1.7fr;
		grid-template-rows: 0.1fr 1.7fr;
		gap: 0 0;
		height: 100vh;
	}


	.ActionChild {
		position: relative;
		box-shadow: 0 2px 10px black;
		z-index: 20;
	}



	.MapChild {
		z-index: 10;
		position: relative;
	}

	.Map{
		position:absolute;
		top:0;
		left:0;
	}

	.CrossHairs {
		position: absolute;
		top:20px;
		left: 20px;
		z-index :30;
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
		justify-content: start;
		align-items: center;
		height: 80px;
		width: 100%;
	}

	.AppTitle {
		font-family: sans-serif;
		font-size: 22px;
		margin-bottom: 12px;
		margin-left: 25px;
	}

	.Brightness {
		position: absolute;
		right: 25px;
		top: 28px;
	}

	.closeBox {
		position: absolute;
		right: 70px;
		top: 28px;
	}

`;
