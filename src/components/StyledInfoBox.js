import styled, {css} from 'styled-components';

const StyledInfoBox = styled.div`
	position: absolute;
	top: 20px;
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
	text-align: center;
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
		padding: 5px;
		color: white;
		background-color: #00aeef00;
		font-size: 0.6rem;
		font-family: sans-serif;
	}
`;

export default StyledInfoBox;
