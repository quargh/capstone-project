import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		background-color: #282C34
	}

	html {
		font-size: 16px;
	}

	body {
		margin: 0;
		font-size: 1rem;
	}
`;
