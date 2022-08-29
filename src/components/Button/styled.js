import styled from 'styled-components';

import {pxToRem} from '../../utils/unit';

const StyledButton = styled.button`
	padding: 8px 8px 4px 8px;
	border: 0 solid rgba(0, 0, 0, 0.3);
	border-radius: ${pxToRem(1.5)};
	background: #fff;
	color: #000;
	font-size: 1em;

	&:hover {
		background: #d8b;
	}

	&:active {
		background: #bad;
	}
`;

export default StyledButton;
