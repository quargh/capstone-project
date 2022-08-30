import useThemeStore from '../../hooks/useThemeStore';

import StyledButton from './MapButton';

const SvgSingle = ({handleClick, svgObject, size = '24px', color = 'currentColor'}) => {
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
					}}
					viewBox="0 0 24 24"
				>
					<path fill={color} d={svgObject.normalState} />
				</svg>
			</div>
		</StyledButton>
	);
};

export default SvgSingle;
