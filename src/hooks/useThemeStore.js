import create from 'zustand';
const useThemeStore = create(set => ({
	isNightMode: true,
	setIsNightMode: isNightMode => set({isNightMode}),
}));

export default useThemeStore;
