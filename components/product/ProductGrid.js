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

const ProductGrid = () => {
	const [{ mode }, dispatch] = useGlobalState();

	const { error, loading, data } = useQuery(ALL_PRODUCTS);
	if (loading) return null;
	if (error) return `Error! ${error}`;

	return (
		<Card.Group doubling itemsPerRow={4} stackable>
			{(!data.allProducts || data.allProducts.length === 0) ? (
				<Dimmer active>
					<Loader size="large">Loading</Loader>
				</Dimmer>
			) : data.allProducts.map((product, index) => (
				<ProductCard key={`${product.id}`} data={product} />
			))}
		</Card.Group>
	);
};

export default ProductGrid;