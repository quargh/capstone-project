/*global google*/
import {useLoadScript, GoogleMap, Marker, MarkerClusterer, Polyline} from '@react-google-maps/api';
import React from 'react';
import {useState, useEffect} from 'react';

import useDistanceStore from '../hooks/useDistanceStore';
import useFetch from '../hooks/useFetch';
import useGPSStore from '../hooks/useGPSStore';
import usePermissionStore from '../hooks/usePermissionStore';
import useThemeStore from '../hooks/useThemeStore';
import {clusterIconStylesDay} from '../mapstyles/ClusterStyles';
import {clusterIconStylesNight} from '../mapstyles/ClusterStyles';
import {DayStyle} from '../mapstyles/DayStyle';
import {NightStyle} from '../mapstyles/NightStyle';

export default function Map() {
	//const isGPSCentered = useGPSStore(state => state.isGPSCentered);
	const setIsGPSCentered = useGPSStore(state => state.setIsGPSCentered);
	const userGPS = useGPSStore(state => state.userGPS);
	//const centerGPS = useGPSStore(state => state.centerGPS);
	const setCenterGPS = useGPSStore(state => state.setCenterGPS);
	const mapCenter = useGPSStore(state => state.mapCenter);
	const setMapCenter = useGPSStore(state => state.setMapCenter);
	const mapZoom = useGPSStore(state => state.mapZoom);
	const setMapZoom = useGPSStore(state => state.setMapZoom);
	const targetGPS = useGPSStore(state => state.targetGPS);
	const setTargetGPS = useGPSStore(state => state.setTargetGPS);
	const isNightMode = useThemeStore(state => state.isNightMode);
	const permission = usePermissionStore(state => state.permission);
	//const isDragging = useGPSStore(state => state.isDragging);
	//const setIsDragging = useGPSStore(state => state.setIsDragging);
	const setDistance = useDistanceStore(state => state.setDistance);

	const [mapRef, setMapRef] = useState(null);
	const [routingURL, setRoutingURL] = useState(null);

	const containerStyle = {
		width: '100%',
		height: '100%',
	};

	const onLoad = React.useCallback(function callback(map) {
		setMapRef(map);
	}, []);

	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	// Pan to target and use callback to set new MapCenter ------------
	// Pan by developer

	useEffect(() => {
		console.log('panTo called...', targetGPS);
		if (mapRef) {
			mapRef.panTo(targetGPS);

			google.maps.event.addListenerOnce(mapRef, 'idle', function () {
				setMapCenter(mapRef.getCenter().toJSON());
				//setTargetGPS(targetGPS);
				//console.log('funktioniert');
			});
		}
		//Das hier ist das Problem. Nicht ausführen, wenn drag oder zoom!!!
	}, [setMapCenter, mapRef, targetGPS, setTargetGPS]);

	// End of target --------------------------------------------------

	// Pan by user (drag end) or zoom
	function handleCenterChanged() {
		if (mapRef) {
			console.log('handleCenterChanged');
			setIsGPSCentered(false);
			//setIsMoving(true);
			setMapCenter(mapRef.getCenter().toJSON());
			setMapZoom(mapRef.getZoom());
			//Versuch
			//setTargetGPS(mapCenter);
			if (JSON.stringify(mapCenter) !== JSON.stringify(userGPS)) {
				//User ist nicht im Center
				//setCenterGPS(false);
				setIsGPSCentered(false);
			}

			google.maps.event.addListenerOnce(mapRef, 'idle', function () {
				//console.log('idle after drag / zoom: getState: ', useGPSStore.getState().userGPS);
				//setUserGPS (useGPSStore.getState().userGPS);
				//setIsMoving(false);
				//Versuch
				//setCenterGPS(false);
				console.log('SettingTarget #3');
				setTargetGPS(mapRef.getCenter().toJSON());
			});
		}
	}

	function onStartDrag() {
		//console.log('startDrag: set centerGPS to false');
		//setIsMoving(true);
		//setCenterGPS(false);
		//setIsDragging(true);
		setIsGPSCentered(false);
	}

	function onEndDrag() {
		console.log('EndDrag');
		//setIsDragging(false);
		handleCenterChanged();
	}

	const [locations, setLocations] = useState([]);
	const URL = 'https://entwicklung.estefan.de/neuefische/clusterer/json/taxiplaetze.json';
	const {loading, error, data} = useFetch(URL);

	// using data structure #2:

	useEffect(() => {
		if (data !== null) {
			//console.log('db length ? ', data.features.length);
			setLocations(
				data.features.map(location => {
					return {
						lat: location.geometry.coordinates[1],
						lng: location.geometry.coordinates[0],
						key: location.id,
					};
				})
			);
		}
	}, [loading, error, data]);

	function onClusterMarkerClick(info) {
		//TODO Das funktioniert zwar, dass daß er nicht centered.
		// Aber er macht keinen panTo
		console.log('SettingCenterGPS #4');
		//TODO Der Wert wird vom im Success Callback komplett ignoriert
		//setCenterGPS(false);
		setIsGPSCentered(false);
		console.log('SettingTarget #4');
		setTargetGPS(info.latLng.toJSON());
		//--
		console.log('OSRM Start: ', userGPS);
		console.log('OSRM Target: ', info.latLng.toJSON());

		setRoutingURL(
			'http://zlgbpg3i56wq2jpp.myfritz.net:5000/route/v1/driving/' +
				userGPS.lng +
				',' +
				userGPS.lat +
				';' +
				info.latLng.toJSON().lng +
				',' +
				info.latLng.toJSON().lat +
				'?overview=full&geometries=geojson'
		);
		console.log(routingURL);
	}

	function onMeClick(info) {
		console.log('SettingCenterGPS #5');
		setCenterGPS(true);
		setIsGPSCentered(true);
		console.log('SettingTarget #5');
		setTargetGPS(info.latLng.toJSON());
	}

	function onClusterClick() {
		console.log('SettingCenterGPS #6');
		setCenterGPS(false);
		setIsGPSCentered(false);
	}

	//const [distance, setDistance] = useState();
	const [routingData, setRoutingData] = useState([]);

	useEffect(() => {
		console.log('load routing');
		async function fetchData() {
			const data = await loadData(routingURL);
			if (data) {
				console.log('Distance: ', data.routes[0].distance);
				setDistance(data.routes[0].distance);
				console.log('Coordinates: ', data.routes[0].geometry.coordinates);
				//setRoutingData(data.routes[0].geometry.coordinates);
				//console.log('length: ', routingData.length);
				//console.log('routing data: ', routingData);
				setRoutingData(
					data.routes[0].geometry.coordinates.map(data => {
						//console.log('data', data);
						return {lat: data[1], lng: data[0]};
					})
				);
			}
		}
		fetchData();

		async function loadData(mUrl) {
			//console.log("func");
			try {
				const response = await fetch(mUrl);
				return await response.json();
			} catch (error) {
				console.log('an error has occurred');
			}
		}
	}, [routingURL, setDistance]);
	const polylineOptions = {
		strokeColor: isNightMode ? '#7bce10' : '#075e55',
		strokeOpacity: 1,
		strokeWeight: 7,
		fillColor: isNightMode ? '#7bce10' : '#075e55',
		fillOpacity: 1,
		clickable: false,
		draggable: false,
		editable: false,
		visible: true,
		radius: 30000,
		zIndex: 1,
	};

	const RenderMap = () => {
		console.log('MAP RENDER');
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
					onDragEnd={onEndDrag}
					onZoomChanged={handleCenterChanged}
					mapContainerStyle={containerStyle}
					mapContainerClassName="App-map"
					tilt={0}
					zoom={mapZoom}
					zoomControlOptions={true}
					version="weekly"
					heading={180}
				>
					<Marker
						position={userGPS}
						onClick={MapMouseEvent => {
							onMeClick(MapMouseEvent);
						}}
						animation={permission ? google.maps.Animation.DROP : null}
						icon={{
							path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
							fillColor: '#00aeef',
							visible: !!permission,
							fillOpacity: 1,
							scale: 2.5,
							strokeWeight: 0,
							anchor: new google.maps.Point(12, 22),
							animation: 'DROP',
							label: 'me',
						}}
					/>

					<MarkerClusterer
						averageCenter={true}
						minimumClusterSize={5}
						gridSize={60}
						styles={isNightMode ? clusterIconStylesNight : clusterIconStylesDay}
						zoomOnClick={true}
						onClick={MapMouseEvent => {
							onClusterClick(MapMouseEvent);
						}}
					>
						{clusterer =>
							locations.map((location, index) => (
								<Marker
									zIndex={index}
									key={location.key}
									position={{lat: location.lat, lng: location.lng}}
									clusterer={clusterer}
									zoomOnClick={true}
									icon={{
										path: 'M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z',
										fillColor: isNightMode ? '#d3d5d8' : '#075e55',
										fillOpacity: 1,
										scale: 1.2,
										strokeWeight: 0,
										anchor: new google.maps.Point(12, 22),
									}}
									onClick={MapMouseEvent => {
										onClusterMarkerClick(MapMouseEvent);
									}}
								/>
							))
						}
					</MarkerClusterer>

					<Polyline
						//onLoad={onLoad}
						path={routingData}
						options={polylineOptions}
					/>
				</GoogleMap>
			</div>
		);
	};

	if (loadError) {
		return <div>Map cannot be loaded right now, sorry.</div>;
	}
	return isLoaded ? RenderMap() : <div>Map is loading...</div>;
}
