import styled, {css} from 'styled-components';

import {pxToRem} from '../../utils/unit';

const MapButton = styled.button`
	padding: 8px 8px 8px 8px;
	border: 0 solid #444;
	border-radius: ${pxToRem(1.5)};
	color: #000;
	font-size: 1em;
	cursor: pointer;
	${({variant}) =>
		variant === 'night' &&
		css`
			color: white;
			background: #ffffffcc;

			&:hover {
				background: #fff;
			}

			&:active {
				background: #fff;
			}
		`}
	${({variant}) =>
		variant === 'day' &&
		css`
			color: #66666666;
			background: #444444cc;

			&:hover {
				background: #444;
			}

			&:active {
				background: #444;
			}
		`}
`;

export default MapButton;
