import styled, {css} from 'styled-components';

const StyledInfoBox = styled.div`
	position: absolute;
	top: -40px;
	right: 20px;
	width: 150px;
	height: 40px;
	padding: 10px 10px;
	border: 0 solid white;
	border-radius: 2px;
	background-color: #38414e;
	font-family: sans-serif;
	font-size: 16px;
	font-weight: bold;
	line-height: 22px;
	text-align: center;
	${({variant}) =>
		variant === 'day' &&
		css`
			color: white;
			background: #075e55;

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
		padding: 5px;
		background-color: #00aeef00;
		color: white;
		font-family: sans-serif;
		font-size: 0.6rem;
	}
`;

export default StyledInfoBox;
