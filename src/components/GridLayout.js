import dynamic from 'next/dynamic';

import useGPSStore from '../hooks/useGPSStore';
import usePermissionStore from '../hooks/usePermissionStore';
import useThemeStore from '../hooks/useThemeStore';

import ActionBar from './ActionBar';
import ButtonSeparator from './Button/ButtonSeparator';
import SvgSingle from './Button/SvgSingle';
import SvgToggle from './Button/SvgToggle';

const Map = dynamic(() => import('./Map'), {
	ssr: false,
});

export default function GridLayout() {
	const isNightMode = useThemeStore(state => state.isNightMode);
	const setUserGPS = useGPSStore(state => state.setUserGPS);
	const setIsGPSCentered = useGPSStore(state => state.setIsGPSCentered);
	const mapZoom = useGPSStore(state => state.mapZoom);
	const setMapZoom = useGPSStore(state => state.setMapZoom);
	const setTargetGPS = useGPSStore(state => state.setTargetGPS);
	const permission = usePermissionStore(state => state.permission);
	const setPermission = usePermissionStore(state => state.setPermission);

	// - LOCATION -------------------------------------------------------------------- >
	function getLocation() {
		console.log('getLocation');
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			alert('no geolocation');
		}
	}

	function success(position) {
		console.log('getLocation: success');
		if (!permission) {
			console.log('permission was false');
			startLocationInterval();
		}
		setPermission(true);
		setUserGPS({lat: position.coords.latitude, lng: position.coords.longitude});
		setTargetGPS({lat: position.coords.latitude, lng: position.coords.longitude});
		setIsGPSCentered(true);
	}

	let locationInterval;
	function startLocationInterval() {
		console.log('startLocationInterval');
		locationInterval = setInterval(() => {
			console.log('run Interval');
			getLocation();
		}, 5000);
	}

	function error(e) {
		console.log('error');
		setPermission(false);
		console.warn(`ERROR(${e.code}): ${e.message}`);
		//setTargetGPS({lat: 53.56, lng: 9.95});
		clearInterval(locationInterval);
	}

	// End of LOCATION -----------------------------------------------------------------

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

	function onHandleGPSClick() {
		getLocation();
		console.log('click');
	}

	function onHandlePlusClick() {
		setMapZoom(mapZoom + 1);
		console.log('plus: ', mapZoom);
	}

	function onHandleMinusClick() {
		setMapZoom(mapZoom - 1);
		console.log('minus', mapZoom);
	}

	return (
		<div className={'GridContainer'}>
			<ActionBar />
			<div className={'MapChild'}>
				<Map className={'Map'}></Map>
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
			</div>
		</div>
	);
}
