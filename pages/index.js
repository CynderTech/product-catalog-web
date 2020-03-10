// import Fetch from 'isomorphic-unfetch';
import Layout from '../components/layout/Layout';

import Tiles from '../components/global/Tiles';
import CheckOut from '../components/checkout/CheckOut';

// import Prices from '../components/Prices';

const Index = (props) => (
    <Layout>
        <div>
            <h1>Welcome to Buy Moto</h1>
            <p>Get yours now! while the price is very high!</p>
            {/* <Tiles data={props.products} /> */}
            <Tiles />
            {/* <CheckOut /> */}
        </div>
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