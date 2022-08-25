import create from 'zustand';
//import {persist} from 'zustand/middleware';

const useThemeStore = create(
	// implizites return!!
	set => ({
		isNightMode: false,
		setIsNightMode: isNightMode => set({isNightMode}),
	})
);

export default useThemeStore;
