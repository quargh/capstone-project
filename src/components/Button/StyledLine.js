import styled from 'styled-components';

const StyledLine = styled.span`
	position: absolute;
	z-index: 40;
	display: inline-block;
	right: 20px;
	bottom: ${({y = '72px'}) => y};
	width: 40px;
	border-top: 1px solid ${({hex = '#000'}) => hex};
`;

export default StyledLine;
