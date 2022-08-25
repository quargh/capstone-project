import Head from 'next/head';
import Image from 'next/image';

import logo from '../../public/logo192.png';
import Layout from '../components/Layout';

export default function AboutPage() {
	return (
		<Layout>
			<Head>
				<title key="title">About</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<h1>About</h1>
			<Image
				src={logo}
				alt={'logo'}
				//width={25}
				//height={25}
			/>
		</Layout>
	);
}
