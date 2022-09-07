import styled, {css} from 'styled-components';

const StyledInfoBox = styled.div`
	position: absolute;
	//bottom: 45px;
	//margin: auto;
	//left: 0;
	//right: 0;
	top: 20px;
	right: 20px;
	width: 150px;
	height: 40px;
	padding: 10px 10px;
	background-color: #38414e;
	font-family: sans-serif;
	font-size: 16px;
	text-align: center;
	border-radius: 2px;
	font-weight: bold;
	border: 0 solid white;
	line-height: 22px;

	${({variant}) =>
		variant === 'day' &&
		css`
			color: white;
			background: #075e55;

			&:hover {
				background: #fff;
			}

			&:active {
				background: #fff;
			}
			& span {
				color: white;
				background-color: #075e55;
				font-weight: bold;
			}
		`}
	${({variant}) =>
		variant === 'night' &&
		css`
			color: #38414e;
			background: #7bce10;

			&:hover {
				background: #444;
			}

			&:active {
				background: #444;
			}
			& span {
				color: #38414e;
				background-color: #7bce10;
				font-weight: bold;
			}
		`}

	&::before {
		position: absolute;
		top: -11px;
		left: 8px;

		font-size: 0.6rem;
		padding: 5px;
		background-color: #00aeef00;
		color: white;
		font-family: sans-serif;
	}
`;

export default StyledInfoBox;
