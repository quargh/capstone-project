import create from 'zustand';
import {persist} from 'zustand/middleware';

const useThemeStorePersist = create(
	persist(
		// implizites return!!
		set => ({
			isNightMode: true,
			setIsNightMode: isNightMode => set({isNightMode}),
		}),
		{
			name: 'theme-storage', // unique name
			getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used (alternativ sessionStorage)
		}
	)
);

export default useThemeStorePersist;
