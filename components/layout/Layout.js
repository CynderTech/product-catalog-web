import React from 'react';
import Head from 'next/head';
import SidebarX from '../global/Sidebar';

const Layout = props => {

	return (
		<div>
			<Head>
				<title>Shop Moto</title>
				<link href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" rel="stylesheet" />
			</Head>
			<SidebarX>
				{props.children}
			</SidebarX>
		</div>
	);
};

export default Layout;