import create from 'zustand';

const useDistanceStore = create(set => ({
	distance: 0,
	setDistance: distance => set({distance}),
	y: 0,
	setY: y => set({y}),
}));
export default useDistanceStore;
