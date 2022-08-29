import {useLoadScript, GoogleMap} from '@react-google-maps/api';
import React from 'react';
import {useState, useEffect} from 'react';

import useGPSStore from '../hooks/useGPSStore';
import useThemeStore from '../hooks/useThemeStore';
import {DayStyle} from '../mapstyles/DayStyle';
import {NightStyle} from '../mapstyles/NightStyle';

export default function Map({mapTarget, mapZoom}) {
	// Zustand ---------------------------------------------------->

	//const isGPSCentered = useGPSStore(state => state.isGPSCentered);
	const setIsGPSCentered = useGPSStore(state => state.setIsGPSCentered);
	//--
	const userGPS = useGPSStore(state => state.userGPS);
	//const setUserGPS = useGPSStore(state => state.setUserGPS);
	//--
	const mapCenter = useGPSStore(state => state.mapCenter);
	const setMapCenter = useGPSStore(state => state.setMapCenter);
	//--
	const isNightMode = useThemeStore(state => state.isNightMode);
	console.log('Map: ', isNightMode);

	// End of Zustand ----------------------------------------------

	// The things we need to track in state
	const [mapRef, setMapRef] = useState(null);
	//const [center, setCenter] = useState({lat: 53.53, lng: 9.99});
	const center = {lat: 53.53, lng: 9.99};
	// Vars
	// -Maps Background colors
	//const backgrounds = {dayMode: '#a3c7df', nightMode: '#17263c'};

	const containerStyle = {
		width: '100%',
		height: '100%',
	};

	useEffect(() => {
		if (mapRef) {
			//setCenter(mapTarget);
			mapRef.panTo(mapTarget);
		}
	}, [mapRef, mapTarget]);

	const onLoad = React.useCallback(function callback(map) {
		setMapRef(map);
	}, []);

	const {isLoaded, loadError} = useLoadScript({
		// Enter your own Google Maps API key
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});
	if (loadError) {
		return 'error loading maps';
	}

	function handleCenterChanged() {
		if (mapRef) {
			setMapCenter(mapRef.getCenter().toJSON());
			console.log('userGPS: ', userGPS);
			console.log('mapCenter: ', mapCenter);
			if (userGPS !== mapCenter) {
				setIsGPSCentered(false);
			}
		}
	}

	const renderMap = () => {
		return (
			<div className={`GoogleMap GoogleMap--${isNightMode ? 'Night' : 'Day'}`}>
				<GoogleMap
					options={{
						styles: isNightMode ? NightStyle : DayStyle,
						backgroundColor: '#00000000',
						tilt: 0,
						zoomControl: true,
						streetViewControl: false,
						disableDefaultUI: true,
						gestureHandling: 'greedy',
					}}
					onLoad={onLoad}
					center={center}
					onDragStart={handleCenterChanged}
					//onDragEnd={handleCenterChanged}
					onZoomChanged={handleCenterChanged}
					mapContainerStyle={containerStyle}
					mapContainerClassName="App-map"
					tilt={0}
					zoom={mapZoom}
					zoomControlOptions={true}
					version="weekly"
				></GoogleMap>
			</div>
		);
	};

	return isLoaded ? renderMap() : null;
}
