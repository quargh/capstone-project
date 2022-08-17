import Link from 'next/link';

export default function Header() {
	return (
		<header>
			<nav>
				<Link href="/">Home</Link>
				<Link href="/about">About me</Link>
				<Link href="/test">Test</Link>
				<Link href="/sandbox">Sandbox</Link>
			</nav>
		</header>
	);
}
