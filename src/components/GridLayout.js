//import '../App.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useState} from 'react';

//import {Suspense} from 'react';

import useThemeStore from '../hooks/useThemeStore';
//import useThemeStorePersist from '../hooks/useThemeStorePersist';
//TODO als svg einbinden
import brightnessDay from '../images/brightness-day.png';
import brightnessNight from '../images/brightness-night.png';
//import crossHairsOff from '../images/button_crossHairs_off.png';
//import crossHairsOn from '../images/button_crossHairs_on.png';
import closeBox from '../images/close-box.png';
import MySVG from '../images/MySVG.jsx';

const Map = dynamic(() => import('./Map'), {
	ssr: false,
	suspense: true,
});

export default function GridLayout() {
	//const [zoom, setZoom] = useState(8);
	const zoom = 8;
	//----
	const [target, setTarget] = useState({lat: 0, lng: 0});

	const isNightMode = useThemeStore(state => state.isNightMode);
	const setIsNightMode = useThemeStore(state => state.setIsNightMode);

	//console.clear();
	console.log('Grid: ', isNightMode);

	function getLocation() {
		if (navigator.geolocation) {
			//alert("navigator.geolocation");
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			// Geolocation is not supported by this browser
			alert('no geolocation');
		}
	}

	function success(position) {
		//alert("show position");
		console.log(position.coords.latitude, position.coords.longitude);
		setTarget({lat: position.coords.latitude, lng: position.coords.longitude});
	}

	function error(e) {
		//alert(e.code + " " + e.message)
		console.warn(`ERROR(${e.code}): ${e.message}`);
		// - Temp solution for local http server
		setTarget({lat: 53.56, lng: 9.95});
	}

	return (
		<div className={'GridContainer'}>
			{/* Theme mit Zustand umschalten */}
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
							//console.log(mapStyle);
							{
								/* Zustand switchen */
							}
							if (isNightMode) {
								setIsNightMode(false);
							} else {
								setIsNightMode(true);
							}
						}}
					/>
				</div>
				<div className={'closeBox'}>
					<Image
						src={closeBox}
						alt={'closeBox'}
						width={25}
						height={25}
						onClick={() => {
							//console.log(mapStyle);
							//mapStyle === NightStyle ? setMapStyle(DayStyle) : setMapStyle(NightStyle);
							//setTarget({lat: 43.53, lng: 7.99});
							//alert ("click");
							getLocation();
						}}
					/>
				</div>
			</div>

			{/*----------------------------------------------------------*/}
			{/*- MAP ----------------------------------------------------*/}
			{/*----------------------------------------------------------*/}
			<div className={'MapChild'}>
				{/*----------------------------------------------------------*/}
				<Map className={'Map'} mapTarget={target} mapZoom={zoom}></Map>
				{/*----------------------------------------------------------*/}
				<div className={'CrossHairs'}>
					<div className="CrossHairsRelativeParent">
						<div className={'CrossHairsOff'}>
							<MySVG variant="crossHairs" size="28px" color="#666" />;
						</div>
						<div className={'CrossHairsOn'}>
							<MySVG variant="crossHairsGPS" size="28px" color="#666" />;
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
