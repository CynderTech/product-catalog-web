import React, { Component } from 'react';
import {
	Grid, Card, Dimmer, Loader, Image, Checkbox, Rail, Segment, Sticky, Transition
} from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useGlobalState } from '../global/useGlobalState';

import ProductCard from './ProductCard';


const ALL_PRODUCTS = gql`
    query {
        allProducts {
			id,
            name,
            desc,
            price
        }
    }
`;

const dataMoto = [
	{
		id: '1',
		img: 'https://i.pinimg.com/originals/da/f6/48/daf648ecba442f1f7750c14033826f2c.jpg',
		name: 'Ensaymada',
		desc: 'Cheesy Ensay',
		qty: 0,
		price: 10
	},
	{
		id: '2',
		img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/PSU-Open1.jpg/1200px-PSU-Open1.jpg',
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
	},
	{
		id: '6',
		img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
		name: 'Chocolate Moron',
		desc: 'Chocolate Sweet Suman HAHAHAHAHHSDASHLDASDL ASLKJDASLK  LSAJDALKJ ASLKJDSLKJAS LKJASLDKJ',
		qty: 0,
		price: 200
	},
	{
		id: '7',
		img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
		name: 'Chocolate Moron',
		desc: 'Chocolate Sweet Suman HAHAHAHAHHSDASHLDASDL ASLKJDASLK  LSAJDALKJ ASLKJDSLKJAS LKJASLDKJ',
		qty: 0,
		price: 200
	},
	{
		id: '8',
		img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
		name: 'Chocolate Moron',
		desc: 'Chocolate Sweet Suman HAHAHAHAHHSDASHLDASDL ASLKJDASLK  LSAJDALKJ ASLKJDSLKJAS LKJASLDKJ',
		qty: 0,
		price: 200
	},
	{
		id: '9',
		img: 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder-300x200.png',
		name: 'Chocolate Moron',
		desc: 'Chocolate Sweet Suman HAHAHAHAHHSDASHLDASDL ASLKJDASLK  LSAJDALKJ ASLKJDSLKJAS LKJASLDKJ',
		qty: 0,
		price: 200
	}
];

const ProductGrid = () => {
	const [{ mode }, dispatch] = useGlobalState();

	const { error, loading, data } = useQuery(ALL_PRODUCTS);
	if (loading) return null;
	if (error) return `Error! ${error}`;

	return (

		<Card.Group doubling itemsPerRow={4} stackable>
			{(!dataMoto || dataMoto.length === 0) ? (
				<Dimmer active>
					<Loader size="large">Loading</Loader>
				</Dimmer>
			) : data.ALL_PRODUCTS.map((product, index) => (
				<ProductCard key={`${product.id}`} data={product} />
			))}
		</Card.Group>
	);
};

export default ProductGrid;