import React, { Component } from 'react'
import { Grid, Card, Icon, Image, Segment } from 'semantic-ui-react'
import { useGlobalState } from '../global/useGlobalState';

import { useQuery } from '@apollo/react-hooks';
import ProductCard from '../product/ProductCard';
import { gql } from 'apollo-boost';


const ALL_PRODUCTS = gql`
    query {
        allProducts {
            name,
            desc,
            price
        }
    }
`

const dataMoto = [{
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Ensaymada',
    desc: 'Cheesy Ensay',
    price: 10
},
{
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Pawerr',
    desc: 'Kamottt',
    price: 35
},
{
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Kakanin',
    desc: 'Glutinous Rice',
    price: 200
},
{
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Binagol',
    desc: 'Grided Kamoteng Kahoy',
    price: 150
},
{
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Chocolate Moron',
    desc: 'Chocolate Sweet Suman',
    price: 200
}];

const ProductGrid = () => {
    const [{ mode }, dispatch] = useGlobalState();

    const { error, loading, data } = useQuery(ALL_PRODUCTS);
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <div>
            <Grid columns={3}>
                <Grid.Row>
<<<<<<< HEAD
                    {data.allProducts.map((product, index) =>
=======
                    {data..map((product, index) =>
>>>>>>> 7ac96b8a7e28a9e629e29c481e1fdbe687efeca2
                        <Grid.Column>
                            <ProductCard data={product} />
                        </Grid.Column>
                    )}
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default ProductGrid;