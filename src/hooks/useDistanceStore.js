import create from 'zustand';

const useDistanceStore = create(set => ({
	distance: 0,
	setDistance: distance => set({distance}),
}));
export default useDistanceStore;
