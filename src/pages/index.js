import Head from 'next/head';
import {useEffect} from 'react';

import GridLayout from '../components/GridLayout';

import '../styles.js';

export default function HomePage() {
	// - Fix problem 'cropped viewport' on mobile--------------------------------------------- >
	// - useEffect in order to access 'window' (server side rendering)
	useEffect(() => {
		// - prevent next-js error: 'window is not defined'
		if (typeof window !== 'undefined') {
			// - Solution from https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ - >
			// - First we get the viewport height, and we multiply it by 1% to get a value for a vh unit
			let vh = window.innerHeight * 0.01;
			// - Then we set the value in the --vh custom property to the root of the document
			document.documentElement.style.setProperty('--vh', `${vh}px`);
			// - Set css property of GridContainer in styles.js:
			// - height: calc(var(--vh, 1vh) * 100);
			// - Listen to the resize event
			window.addEventListener('resize', () => {
				// We execute the same script as before
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			});
		}
	}, []);
	// - End of fix 'cropped viewport' on mobile------------------------------------------------

	return (
		<GridLayout>
			<Head>
				<title key="X-Navigator">My Project</title>
				<meta key="description" name="description" content="Geo Object Locator" />
			</Head>
		</GridLayout>
	);
}
