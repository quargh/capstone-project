import create from 'zustand';
const useThemeStore = create(
	// implizites return!!
	set => ({
		isNightMode: true,
		setIsNightMode: isNightMode => set({isNightMode}),
	})
);

export default useThemeStore;
