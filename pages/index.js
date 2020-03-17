import React from 'react';
// import Fetch from 'isomorphic-unfetch';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/layout/Layout';
import { ProductCatalogProvider } from '../components/global/useGlobalState';
import Catalog from '../components/product/Catalog';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import PageIndicator from '../components/PageIndicator';

// fetch apollo client
const client = new ApolloClient({
	uri: 'http://localhost:3002/admin/api',
	fetch
});

const Index = props => (
	<ProductCatalogProvider>
		<ApolloProvider client={client}>
			<Layout>
				<Navbar>
					{/* <PageIndicator /> */}
					<Catalog />
				</Navbar>
			</Layout>
		</ApolloProvider>
	</ProductCatalogProvider>
);

// Index.getInitialProps = async function () {
//     const res = await fetch('<json url here>');
//     const data = await res.json();

//     return {
//         products: data.products
//     };
// }

export default Index;