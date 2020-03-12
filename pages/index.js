// import Fetch from 'isomorphic-unfetch';
import { ProductCatalogProvider } from '../components/global/useGlobalState';
import Layout from '../components/layout/Layout';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';
import Catalog from '../components/product/Catalog';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';

// fetch apollo client
const client = new ApolloClient({
    uri: 'http://localhost:3002/admin/api',
    fetch
});

const Index = (props) => (
    <ProductCatalogProvider>
        <ApolloProvider client={client}>
            <Layout>
                <Navbar />
                <Cart>
                    <Catalog />
                </Cart>
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