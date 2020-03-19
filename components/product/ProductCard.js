
import React from 'react';
import {
	Button, Card, Icon, Image, Label, Div
} from 'semantic-ui-react';
import numeral from 'numeral';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';


const ProductCard = ({ data }) => {
	const {
		desc, img, name, price
	} = data;
	const [{ cart }, dispatch] = useGlobalState();

	return (
		<Card raised>
			<Image rounded size="large" src={img} ui wrapped />
			<Card.Content>
				<Card.Header
					as="a"
					onClick={() => dispatch({ type: types.VIEW_PRODUCT, selectedProduct: data })}
					style={{
						width: '200px',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis'
					}}>
					{name}
				</Card.Header>
				<Card.Meta>
					<span>Category</span>
				</Card.Meta>
				<Card.Content as="a">
					<span style={{ color: 'green' }}>{numeral(price || 0).format('$ 0,0.00')}</span>
				</Card.Content>
			</Card.Content>
			<Card.Content extra>
				<Button.Group basic fluid size="mini">
					<Button onClick={() => {
						dispatch({ type: types.ADD_TO_CART, selectedProduct: data });
					}}>
						<Icon color="red" name="add to cart" />
						{' '}
						Add to Cart
					</Button>
					<Button onClick={() => dispatch({ type: types.QUICK_BUY, selectedProduct: data })}>
						Buy Now
					</Button>
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default ProductCard;