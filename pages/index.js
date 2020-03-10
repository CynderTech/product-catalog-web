// import Fetch from 'isomorphic-unfetch';
import Layout from '../components/layout/Layout';

import Tiles from '../components/global/Tiles';
import CheckOut from '../components/checkout/CheckOut';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';

// import Prices from '../components/Prices';

// fetch apollo client
const client = new ApolloClient({
	uri: 'http://localhost:3002/admin/api',
	fetch
});

const Index = (props) => (
    <Layout>
        <ApolloProvider client={client}>
            <div>
                <h1>Welcome to Buy Moto</h1>
                <p>Get yours now! while the price is very high!</p>
                {/* <Tiles data={props.products} /> */}
                <Tiles />
                {/* <CheckOut /> */}
            </div>
        </ApolloProvider>
    </Layout>
);

// Index.getInitialProps = async function () {
//     const res = await fetch('<json url here>');
//     const data = await res.json();

//     return {
//         products: data.products
//     };
// }

export default Index;