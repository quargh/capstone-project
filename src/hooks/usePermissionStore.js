import create from 'zustand';
const usePermissionStore = create(set => ({
	permission: false,
	setPermission: permission => set({permission}),
	requestLocation: false,
	setRequestLocation: requestLocation => set({requestLocation}),
}));

export default usePermissionStore;
