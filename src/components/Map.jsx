/*global google*/
import {useLoadScript, GoogleMap, Marker} from '@react-google-maps/api';
import React from 'react';
import {useState, useEffect} from 'react';

import useGPSStore from '../hooks/useGPSStore';
import useThemeStore from '../hooks/useThemeStore';
import {DayStyle} from '../mapstyles/DayStyle';
import {NightStyle} from '../mapstyles/NightStyle';

export default function Map() {
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
	const mapZoom = useGPSStore(state => state.mapZoom);
	const setMapZoom = useGPSStore(state => state.setMapZoom);
	//--
	const targetGPS = useGPSStore(state => state.targetGPS);
	//const setTargetGPS = useGPSStore(state => state.setTargetGPS);
	//--
	const isNightMode = useThemeStore(state => state.isNightMode);

	// End of Zustand ----------------------------------------------

	// The things we need to track in state
	const [mapRef, setMapRef] = useState(null);

	const containerStyle = {
		width: '100%',
		height: '100%',
	};

	const onLoad = React.useCallback(function callback(map) {
		setMapRef(map);
	}, []);
	/*
	const onLoad = marker =>{

	}

	 */

	const {isLoaded, loadError} = useLoadScript({
		// Enter your own Google Maps API key
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	//-----------------------------------------------------------------
	//-----------------------------------------------------------------
	//-----------------------------------------------------------------

	// Pan to target and use callback to set new MapCenter ------------
	// Pan by developer

	useEffect(() => {
		if (mapRef) {
			mapRef.panTo(targetGPS);

			google.maps.event.addListenerOnce(mapRef, 'idle', function () {
				setMapCenter(targetGPS);
				console.log('Funktioniert');
			});
		}
	}, [setMapCenter, mapRef, targetGPS]);

	// End of target --------------------------------------------------

	// Pan by user (drag end) or zoom
	function handleCenterChanged() {
		if (mapRef) {
			setMapCenter(mapRef.getCenter().toJSON());
			setMapZoom(mapRef.getZoom());
			//console.log('userGPS: ', userGPS);
			console.log('mapCenter: ', JSON.stringify(mapCenter));
			console.log('userGPS: ', JSON.stringify(userGPS));
			if (JSON.stringify(mapCenter) !== JSON.stringify(userGPS)) {
				setIsGPSCentered(false);
			}
		}
	}

	function onStartDrag() {
		setIsGPSCentered(false);
	}

	const RenderMap = () => {
		return (
			<div className={`GoogleMap GoogleMap--${isNightMode ? 'Night' : 'Day'}`}>
				<GoogleMap
					options={{
						styles: isNightMode ? NightStyle : DayStyle,
						backgroundColor: '#0000',
						tilt: 0,
						zoomControl: false,
						streetViewControl: false,
						disableDefaultUI: true,
						gestureHandling: 'greedy',
					}}
					onLoad={onLoad}
					center={mapCenter}
					onDragStart={onStartDrag}
					onDragEnd={handleCenterChanged}
					onZoomChanged={handleCenterChanged}
					mapContainerStyle={containerStyle}
					mapContainerClassName="App-map"
					tilt={0}
					zoom={mapZoom}
					zoomControlOptions={true}
					version="weekly"
				>
					<Marker
						position={userGPS}
						icon={{
							path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
							fillColor: '#00AEEF',
							fillOpacity: 1,
							scale: 2.5,
							strokeWeight: 0,
							anchor: new google.maps.Point(12, 22),
						}}
					/>
				</GoogleMap>
			</div>
		);
	};

	if (loadError) {
		return <div>Map cannot be loaded right now, sorry.</div>;
	}
	return isLoaded ? RenderMap() : <div>Map is loading</div>;
}
