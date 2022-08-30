import create from 'zustand';

const useGPSStore = create(
	// implizites return!!
	set => ({
		isGPSCentered: false,
		setIsGPSCentered: isGPSCentered => set({isGPSCentered}),
		userGPS: {lat: 0, lng: 0},
		setUserGPS: userGPS => set({userGPS}),
		mapCenter: {lat: 53.51, lng: 9.99},
		setMapCenter: mapCenter => set({mapCenter}),
		mapZoom: 14,
		setMapZoom: mapZoom => set({mapZoom}),
		targetGPS: {lat: 53.51, lng: 9.99},
		setTargetGPS: targetGPS => set({targetGPS}),
	})
);
export default useGPSStore;
