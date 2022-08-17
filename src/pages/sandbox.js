import {LoadScript, GoogleMap} from '@react-google-maps/api';
//import React, { useState, useRef, useCallback } from "react";

export default function SandboxPage() {
	return <Map />;
}

function Map() {
	return (
		<div className="App">
			<LoadScript
				id="script-loader"
				googleMapsApiKey="AIzaSyCNReGHN6Uan9yZY4Fjh0DwKN43q--Tya8"
				language="en"
				region="us"
			>
				<GoogleMap
					mapContainerClassName="App-map"
					center={{lat: 52.52047739093263, lng: 13.36653284549709}}
					zoom={12}
					version="weekly"
					on
				></GoogleMap>
			</LoadScript>
		</div>
	);
}
