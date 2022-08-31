import create from 'zustand';
const usePermissionStore = create(set => ({
	permission: false,
	setPermission: permission => set({permission}),
}));

export default usePermissionStore;
