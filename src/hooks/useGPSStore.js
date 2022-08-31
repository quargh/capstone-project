import create from 'zustand';

const useGPSStore = create(set => ({
	isGPSCentered: false,
	setIsGPSCentered: isGPSCentered => set({isGPSCentered}),
	userGPS: {lat: 0, lng: 0},
	setUserGPS: userGPS => set({userGPS}),
	mapCenter: {lat: 51.18, lng: 8.4},
	setMapCenter: mapCenter => set({mapCenter}),
	mapZoom: 5,
	setMapZoom: mapZoom => set({mapZoom}),
	targetGPS: {lat: 51.18, lng: 8.4},
	setTargetGPS: targetGPS => set({targetGPS}),
}));
export default useGPSStore;
