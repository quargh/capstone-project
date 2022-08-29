import dynamic from 'next/dynamic';
import {useState} from 'react';

import useGPSStore from '../hooks/useGPSStore';

import ActionBar from './ActionBar';
import SvgToggle from './Button/SvgToggle';

const Map = dynamic(() => import('./Map'), {
	ssr: false,
});

export default function GridLayout() {
	const zoom = 8;
	//----
	// -Zustand
	//const userGPS = useGPSStore(state => state.userGPS);
	const setUserGPS = useGPSStore(state => state.setUserGPS);
	// -
	//const isGPSCentered = useGPSStore(state => state.isGPSCentered);
	const setIsGPSCentered = useGPSStore(state => state.setIsGPSCentered);
	// ----
	// -State
	const [target, setTarget] = useState({lat: 43.53, lng: 3.99});

	// - LOCATION -------------------------------------------------------------------- >
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			// Geolocation is not supported by this browser
			alert('no geolocation');
		}
	}

	function success(position) {
		console.log(position.coords.latitude, position.coords.longitude);

		setUserGPS({lat: position.coords.latitude, lng: position.coords.longitude});
		setTarget({lat: position.coords.latitude, lng: position.coords.longitude});
		setIsGPSCentered(true);
	}

	function error(e) {
		console.warn(`ERROR(${e.code}): ${e.message}`);
		setTarget({lat: 53.56, lng: 9.95});
	}

	//Pfade im svgObject definieren
	const crossHairs = {
		normalState:
			'M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z',
		toggleState:
			'M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z',
	};

	function onHandleGPSClick() {
		getLocation();
		console.log('click');
	}

	// End of LOCATION -----------------------------------------------------------------

	return (
		<div className={'GridContainer'}>
			{/*----------------------------------------------------------*/}
			{/*- ACTION BAR ---------------------------------------------*/}
			{/*----------------------------------------------------------*/}

			<ActionBar onPressTest={getLocation} />

			{/*----------------------------------------------------------*/}
			{/*- MAP ----------------------------------------------------*/}
			{/*----------------------------------------------------------*/}
			<div className={'MapChild'}>
				{/*----------------------------------------------------------*/}
				<Map className={'Map'} mapTarget={target} mapZoom={zoom}></Map>
				{/*----------------------------------------------------------*/}
				<div className={'MapControls'}>
					<SvgToggle
						handleClick={onHandleGPSClick}
						svgObject={crossHairs}
						size={'24px'}
						color={'#666666'}
					/>
				</div>
			</div>
		</div>
	);
}
