
import React from 'react';
import {
	Button, Divider, Icon, Header, Card, Input, Label, Item, Checkbox, Menu, Segment, Sidebar
} from 'semantic-ui-react';
import numeral from 'numeral';
import * as types from './global/types';
import { useGlobalState } from './global/useGlobalState';
import { checkOut } from './product/catalogLibrary';

const Cart = props => {
	const [{
		activeItem, cart, mode, openCart
	}, dispatch] = useGlobalState();
	const totalItems = cart.reduce((a, b) => a + (b.qty || 0), 0);
	const total = cart.filter(item => item.checked === true).reduce((a, b) => a + (b.price * b.qty || 0), 0);

	return (
		<>
			<Segment style={{ marginBottom: '0px', paddingBottom: '15px' }}>
				<Header as="h4">
					<span style={{ color: 'grey' }}>
						<Icon color="grey" name="cart" />
						Cart Moto
					</span>
				</Header>
			</Segment>
			{
				cart.length !== 0
					? (
						<Item.Group
							divided
							style={{
								marginTop: '0px',
								marginLeft: '10px',
								overflow: 'auto',
								marginBottom: '0px',
							}}>
							<Divider hidden style={{ marginBottom: '0px', marginTop: '0px' }} />
							{cart.map(data => React.cloneElement({
								...props.children,
								key: data.id
							}, data))}
						</Item.Group>
					) : (
						<Segment placeholder>
							<Header icon>
								<span style={{ color: 'grey' }}>
									<Icon name="cart arrow down" />
									You have no items in your shopping cart
								</span>

							</Header>
							<Button onClick={() => dispatch({ type: types.CATALOG })} primary>Show Now</Button>
						</Segment>
					)
			}
			{cart.length !== 0
				&& (
					<Segment style={{ marginTop: '0px', paddingTop: '15px' }}>
						<span style={{
							position: 'relative',
							left: '10px',
							fontSize: '18px'
						}}>
							{'Total: '}
							<span style={{ color: 'green' }}>{numeral(total || 0).format('$ 0,0.00')}</span>
						</span>
						<Button
							basic
							color="red"
							disabled={checkOut(cart).length === 0}
							onClick={() => dispatch({ type: types.CHECK_OUT })}
							size="large"
							style={{
								position: 'relative',
								left: '50px',
								bottom: '3px'
							}}>
							Check Out
						</Button>
					</Segment>
				)}

		</>
	);
};

export default Cart;