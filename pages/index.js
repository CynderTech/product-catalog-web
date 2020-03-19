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

// fetch apollo client
const client = new ApolloClient({
	uri: 'http://localhost:3002/admin/api',
	fetch
});

const Index = props => (
	<ProductCatalogProvider>
		<ApolloProvider client={client}>
			<Navbar />
			<Layout>
				<Catalog />
			</Layout>
		</ApolloProvider>
	</ProductCatalogProvider>
);

export default Index;