import useGPSStore from '../../hooks/useGPSStore';
import useThemeStore from '../../hooks/useThemeStore';

import StyledButton from './MapButton';

const SvgToggle = ({handleClick, svgObject, size = '24px', color = 'currentColor'}) => {
	const isGPSCentered = useGPSStore(state => state.isGPSCentered);
	const isNightMode = useThemeStore(state => state.isNightMode);

	return (
		<StyledButton
			variant={isNightMode ? 'night' : 'day'}
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
