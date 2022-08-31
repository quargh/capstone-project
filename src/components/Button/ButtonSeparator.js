import useThemeStore from '../../hooks/useThemeStore';

import StyledLine from './StyledLine';

export default function ButtonSeparator() {
	const isNightMode = useThemeStore(state => state.isNightMode);

	if (isNightMode) {
		return (
			<div>
				<StyledLine y={'72px'} hex={'#808080'} />
				<StyledLine y={'71px'} hex={'#fff'} />
			</div>
		);
	}
	return (
		<div>
			<StyledLine y={'72px'} hex={'#000'} />
			<StyledLine y={'71px'} hex={'#808080'} />
		</div>
	);
}
