import {useLoadScript, GoogleMap} from '@react-google-maps/api';
import React from 'react';
import {useState, Fragment} from 'react';

import useThemeStore from '../hooks/useThemeStore';
//import useThemeStorePersist from '../hooks/useThemeStorePersist';
import {DayStyle} from '../mapstyles/DayStyle';
import {NightStyle} from '../mapstyles/NightStyle';

export default function Map({mapTarget, mapZoom}) {
	// Zustand
	const isNightMode = useThemeStore(state => state.isNightMode);
	console.log('Map: ', isNightMode);

	// The things we need to track in state
	const [mapRef, setMapRef] = useState(null);
	const [center, setCenter] = useState({lat: 53.53, lng: 9.99});

	// Vars
	// -Maps Background wird nicht neu gerendert
	const backgrounds = {dayMode: '#a3c7df', nightMode: '#17263c'};

	const containerStyle = {
		width: '100%',
		height: '100%',
	};

	React.useEffect(() => {
		if (mapRef) {
			//Damit kannst du pannen
			//setCenter(mapTarget);
			mapRef.panTo(mapTarget);
			//alert ("lat: "+ mapTarget.lat);
			//mapRef.moveCamera()
			//const z = mapRef.getTilt();
			//console.log(z);
		}
	}, [mapTarget]);

	// Load the Google Maps scripts
	const {isLoaded} = useLoadScript({
		// Enter your own Google Maps API key
		googleMapsApiKey: 'AIzaSyCNReGHN6Uan9yZY4Fjh0DwKN43q--Tya8',
	});

	const onLoad = React.useCallback(function callback(map) {
		//console.log("map reference: ", map)
		setMapRef(map);
	}, []);

	React.useEffect(() => {
		if (mapRef) {
			//Damit kannst du pannen
			mapRef.panTo({lat: 43.53, lng: 3.99});
		}
	}, [mapRef]);

	function handleCenterChanged() {
		if (mapRef) {
			//mapRef.current.panTo({lat: 43.53, lng: 9.99});
			const newCenter = mapRef.getCenter().toJSON();
			setCenter(newCenter);
			console.log(newCenter);
			//console.log(mapRef)
		}
	}
	/*
	const loadHandler = map => {
		// Store a reference to the Google map instance in state

		//new google.maps.LatLngBounds();
		setMapRef(map);
		// Fit map bounds to contain all markers
		//fitBounds(map);
	};



	 */

	const renderMap = () => {
		return (
			<Fragment>
				<div className="App">
					<GoogleMap
						options={{
							//TODO styles je nach Zustand von switchen: 'isNightMode'

							styles: isNightMode ? NightStyle : DayStyle,
							backgroundColor: isNightMode
								? backgrounds.nightMode
								: backgrounds.dayMode,
							tilt: 0,
							zoomControl: true,
							streetViewControl: false,
							disableDefaultUI: true,
							gestureHandling: 'greedy',
						}}
						onLoad={onLoad}
						center={center}
						//onCenterChanged={handleCenterChanged}
						onDragEnd={handleCenterChanged}
						mapContainerStyle={containerStyle}
						mapContainerClassName="App-map"
						tilt={0}
						zoom={mapZoom}
						zoomControlOptions={true}
						version="weekly"
						on
					></GoogleMap>
				</div>
			</Fragment>
		);
	};
	return isLoaded ? renderMap() : null;
}
