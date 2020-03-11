// import Fetch from 'isomorphic-unfetch';
import { PrometheusProvider } from '../components/global/useGlobalState';
import Layout from '../components/layout/Layout';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';

import Frame from '../components/product/Frame';

// fetch apollo client
const client = new ApolloClient({
    uri: 'http://localhost:3002/admin/api',
    fetch
});

const Index = (props) => (
    <Layout>
        <PrometheusProvider>
            <ApolloProvider client={client}>
                <div>
                    {/* <Tiles data={props.products} /> */}
                    <Frame />
                    {/* <CheckOut /> */}
                </div>
            </ApolloProvider>
        </PrometheusProvider>
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