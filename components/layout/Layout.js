
import Head from 'next/head';

const Layout = (props) => (
	<div>
		<Head>
			<title>Buy Moto</title>
			<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
		</Head>
		{props.children}
	</div>
);

export default Layout;