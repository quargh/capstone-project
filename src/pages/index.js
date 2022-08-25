import Head from 'next/head';

import GridLayout from '../components/GridLayout';

import '../styles.js';

export default function HomePage() {
	return (
		<GridLayout>
			<Head>
				<title key="title">My Project</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
		</GridLayout>
	);
}
