import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		background-color: #282C34;
	}

	html {
		color: white;
		font-size: 16px;
	}

	body {
		margin: 0;
		font-size: 1rem;
	}

	.App {
		font-family: sans-serif;
		text-align: center;
		height: 100vh;
	}

	.App-map {
		height: 100%;
		width: 100%;
	}
`;
