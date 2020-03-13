import React, { Component } from 'react'
import { Grid, Card, Icon, Image, Checkbox, Rail, Segment, Sticky, Transition } from 'semantic-ui-react'
import { useGlobalState } from '../global/useGlobalState';

import { useQuery } from '@apollo/react-hooks';
import ProductCard from '../product/ProductCard';
import { gql } from 'apollo-boost';


const ALL_PRODUCTS = gql`
    query {
        allProducts {
            id,
            name,
            desc,
            price
        }
    }
`

const dataMoto = [{
    id: '1',
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Ensaymada',
    desc: 'Cheesy Ensay',
    qty: 0,
    price: 10
},
{
    id: '2',
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Pawerr',
    desc: 'Kamottt',
    qty: 0,
    price: 35
},
{
    id: '3',
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Kakanin',
    desc: 'Glutinous Rice',
    qty: 0,
    price: 200
},
{
    id: '4',
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Binagollololololololololololol',
    desc: 'Grided Kamoteng Kahoy',
    qty: 0,
    price: 150
},
{
    id: '5',
    img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
    name: 'Chocolate Moron',
    desc: 'Chocolate Sweet Suman HAHAHAHAHHSDASHLDASDL ASLKJDASLK  LSAJDALKJ ASLKJDSLKJAS LKJASLDKJ',
    qty: 0,
    price: 200
}];

const ProductGrid = () => {
    const [{ mode }, dispatch] = useGlobalState();

    // const { error, loading, data } = useQuery(ALL_PRODUCTS);
    // if (loading) return null;
    // if (error) return `Error! ${error}`;

    return (
        <div>
            <Grid columns={4} doubling stackable>
                <Grid.Row>
                    {dataMoto.map((product, index) =>
                        <Grid.Column fixed>
                            <ProductCard data={product} />
                        </Grid.Column>
                    )}
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default ProductGrid;