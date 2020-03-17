import React from 'react';
import Head from 'next/head';

const Layout = props => (
	<div>
		<Head>
			<title>Buy Moto</title>
			<link href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" rel="stylesheet" />
		</Head>
		{props.children}
	</div>
);

export default Layout;