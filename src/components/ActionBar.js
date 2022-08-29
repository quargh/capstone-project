import Image from 'next/image';

import useThemeStore from '../hooks/useThemeStore';
import brightnessDay from '../images/brightness-day.png';
import brightnessNight from '../images/brightness-night.png';

export default function ActionBar() {
	const isNightMode = useThemeStore(state => state.isNightMode);
	const setIsNightMode = useThemeStore(state => state.setIsNightMode);

	return (
		// Theme mit Zustand umschalten
		<div className={isNightMode ? 'ActionChild Night' : 'ActionChild Day'}>
			<div className={'TitleParent'}>
				{/* Theme mit Zustand umschalten */}
				<h1 className={isNightMode ? 'AppTitle Night' : 'AppTitle Day'}>X-Navigator</h1>
			</div>
			<div className={'Brightness'}>
				<Image
					src={isNightMode ? brightnessNight : brightnessDay}
					alt={'brightness'}
					width={25}
					height={25}
					onClick={() => {
						// Zustand switchen
						if (isNightMode) {
							setIsNightMode(false);
						} else {
							setIsNightMode(true);
						}
					}}
				/>
			</div>
		</div>
	);
}