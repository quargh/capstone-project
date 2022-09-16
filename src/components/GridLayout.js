import {motion} from 'framer-motion';
import {useCallback, useEffect, useRef} from 'react';

import useDistanceStore from '../hooks/useDistanceStore';
import useGPSStore from '../hooks/useGPSStore';
import usePermissionStore from '../hooks/usePermissionStore';
import useThemeStore from '../hooks/useThemeStore';

import ActionBar from './ActionBar';
import ButtonSeparator from './Button/ButtonSeparator';
import SvgSingle from './Button/SvgSingle';
import SvgToggle from './Button/SvgToggle';
import Map from './Map';
import StyledInfoBox from './StyledInfoBox';

export default function GridLayout() {
	const isNightMode = useThemeStore(state => state.isNightMode);
	const userGPS = useGPSStore(state => state.userGPS);
	const setUserGPS = useGPSStore(state => state.setUserGPS);
	const centerGPS = useGPSStore(state => state.centerGPS);
	const setCenterGPS = useGPSStore(state => state.setCenterGPS);
	//const isGPSCentered = useGPSStore(state => state.isGPSCentered);
	const setIsGPSCentered = useGPSStore(state => state.setIsGPSCentered);
	const mapZoom = useGPSStore(state => state.mapZoom);
	const setMapZoom = useGPSStore(state => state.setMapZoom);
	const setTargetGPS = useGPSStore(state => state.setTargetGPS);
	//const permission = usePermissionStore(state => state.permission);
	const setPermission = usePermissionStore(state => state.setPermission);
	//const requestLocation = usePermissionStore(state => state.requestLocation);
	//const setRequestLocation = usePermissionStore(state => state.setRequestLocation);
	const distance = useDistanceStore(state => state.distance);
	const y = useDistanceStore(state => state.y);

	//
	console.log('MAIN RENDER ---------------');

	// - GEO LOCATION -------------------------------------------------------------------- >

	const centerGPSRef = useRef(false);

	function setCenterGPSRef(myBoolean) {
		centerGPSRef.current = myBoolean;
	}

	const handleGeoLocationSuccess = useCallback(
		position => {
			setPermission(true);

			setUserGPS({lat: position.coords.latitude, lng: position.coords.longitude});

			console.log('### [READ] handleGeoLocationSuccess centerGPS: ', centerGPS);
			console.log('### [READ] handleGeoLocationSuccess centerGPSRef: ', centerGPSRef);

			if (centerGPSRef.current === true) {
				//console.log('Set Target #1 centerGPS was', centerGPS);
				setTargetGPS({lat: position.coords.latitude, lng: position.coords.longitude});
				setIsGPSCentered(true);
			}
		},
		[centerGPS, setIsGPSCentered, setPermission, setTargetGPS, setUserGPS]
	);

	const handleGeoLocationError = useCallback(
		error => {
			setPermission(false);
			console.log('error');
			console.warn(`ERROR(${error.code}): ${error.message}`);
			//setTargetGPS({lat: 53.56, lng: 9.95});
		},
		[setPermission]
	);
	//function error(e) {}

	useEffect(() => {
		console.log('### MAIN USE EFFECT');

		//if (requestLocation === true) {
		function getLocation() {
			//console.log('### run getLocation ###');
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					handleGeoLocationSuccess,
					handleGeoLocationError
				);
			} else {
				alert('no geolocation');
			}
		}

		getLocation();

		const interval = setInterval(() => {
			//getLocation();
		}, 5000);

		return () => clearInterval(interval);

		//}
	}, [handleGeoLocationSuccess, handleGeoLocationError]);

	// - End of GEO LOCATION -----------------------------------------------------------------

	function onHandleGPSClick() {
		//console.log('onHandleGPSClick: ', userGPS);

		//setTargetGPS(userGPS);
		//setIsGPSCentered(true);
		console.log('SettingCenterGPS #2');
		console.log('### onHandleGPSClick setCenterGPS to true');
		setCenterGPS(true);
		setIsGPSCentered(true);
		console.log('SettingTarget #2');
		setTargetGPS(userGPS);
		setCenterGPSRef(true);

		//setRequestLocation(true);
	}

	function onHandlePlusClick() {
		setMapZoom(mapZoom + 1);
		console.log('plus: ', mapZoom);
	}

	function onHandleMinusClick() {
		setMapZoom(mapZoom - 1);
		console.log('minus', mapZoom);
	}

	/*
	useEffect(() => {
		if (requestLocation === true && permission === false) {
			//console.log('execute getLocation @ useEffect');
			//callGetLocation();
		}
	}, [requestLocation, callGetLocation]);

	 */

	const crossHairs = {
		normalState:
			'M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z',
		toggleState:
			'M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z',
	};
	const plus = {
		normalState: 'M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z',
	};
	const minus = {
		normalState: 'M20 14H4V10H20',
	};

	/*
	const spring = {
		type: 'spring',
		stiffness: 50,
		damping: 50,
	};

	 */

	return (
		<div className={'GridContainer'}>
			<ActionBar />
			<div className={'MapChild'}>
				<Map className={'Map'} handleGPSClick={setCenterGPSRef}></Map>
				<div className={'CrossHairs'}>
					<SvgToggle
						handleClick={onHandleGPSClick}
						svgObject={crossHairs}
						size={'24px'}
						color={isNightMode ? '#666666' : '#ffffff'}
					/>
				</div>
				<div className={'Plus'}>
					<SvgSingle
						handleClick={onHandlePlusClick}
						svgObject={plus}
						size={'24px'}
						color={isNightMode ? '#666666' : '#ffffff'}
					/>
				</div>
				<ButtonSeparator />
				<div className={'Minus'}>
					<SvgSingle
						handleClick={onHandleMinusClick}
						svgObject={minus}
						size={'24px'}
						color={isNightMode ? '#666666' : '#ffffff'}
					/>
				</div>

				<StyledInfoBox
					as={motion.div}
					animate={{y: y}}
					transition={{type: 'Inertia'}}
					variant={isNightMode ? 'night' : 'day'}
				>
					<span>{(distance / 1000).toFixed(2)}</span> km
				</StyledInfoBox>
			</div>
		</div>
	);
}
