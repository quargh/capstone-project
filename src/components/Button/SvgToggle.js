import useGPSStore from '../../hooks/useGPSStore';

import StyledButton from './MapButton';

const SvgToggle = ({handleClick, svgObject, size = '24px', color = 'currentColor'}) => {
	//const [isVisible, setVisible] = useState(true);
	const isGPSCentered = useGPSStore(state => state.isGPSCentered);
	//const setIsGPSCentered = useGPSStore(state => state.setIsGPSCentered);
	return (
		//Hier mit styled component wrappen
		//TODO props an StyledButton übergeben
		// Bei hover an svg andere color übergeben
		<StyledButton
			onClick={() => {
				handleClick();
			}}
		>
			<div
				style={{
					position: 'relative',
					width: size,
					height: size,
				}}
			>
				<svg
					id="normal"
					style={{
						width: size,
						height: size,
						position: 'absolute',
						top: 0,
						left: 0,
						display: `${isGPSCentered ? 'none' : 'block'}`,
					}}
					viewBox="0 0 24 24"
				>
					<path fill={color} d={svgObject.normalState} />
				</svg>
				<svg
					id="toggle"
					style={{
						width: size,
						height: size,
						position: 'absolute',
						top: 0,
						left: 0,
						display: `${isGPSCentered ? 'block' : 'none'}`,
					}}
					viewBox="0 0 24 24"
				>
					<path fill={color} d={svgObject.toggleState} />
				</svg>
			</div>
		</StyledButton>
	);
};
export default SvgToggle;
