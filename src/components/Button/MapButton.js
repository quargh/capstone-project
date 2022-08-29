import styled from 'styled-components';

import {pxToRem} from '../../utils/unit';

const MapButton = styled.button`
	padding: 8px 8px 8px 8px;
	border: 0 solid rgba(0, 0, 0, 0.3);
	border-radius: ${pxToRem(1.5)};
	background: #fff;
	color: #000;
	font-size: 1em;
	cursor: pointer;

	&:hover {
		background: #fff;
	}

	&:active {
		background: #fff;
	}
`;

export default MapButton;
