import create from 'zustand';

const useGPSStore = create(
	// implizites return!!
	set => ({
		isGPSCentered: false,
		setIsGPSCentered: isGPSCentered => set({isGPSCentered}),
		userGPS: {lat: 0, lng: 0},
		setUserGPS: userGPS => set({userGPS}),
		mapCenter: {lat: 0, lng: 0},
		setMapCenter: mapCenter => set({mapCenter}),
	})
);
export default useGPSStore;
