
import React from 'react';
import Link from 'next/link';
import {
	Button, Divider, Icon, Header, Card, Input, Label, Item, Checkbox, Menu, Segment, Sidebar
} from 'semantic-ui-react';
import numeral from 'numeral';
import * as types from './global/types';
import { useGlobalState } from './global/useGlobalState';
import { checkOut } from './product/catalogLibrary';
import Cart from './Cart';
import CartItem from './product/CartItem';

const Navbar = props => {
	const [{
		activeItem, cart, mode, openCart
	}, dispatch] = useGlobalState();
	const totalItems = cart.reduce((a, b) => a + (b.qty || 0), 0);
	const total = cart.filter(item => item.checked === true).reduce((a, b) => a + (b.price * b.qty || 0), 0);

	return (
		<Segment basic style={{ paddingTop: '10px', paddingBottom: '0px' }}>
			<Menu inverted>
				{mode === types.CATALOG
					&& (
						<Menu.Item
							active={activeItem === 'home'}
							name="buy moto"
							onClick={(e, { name }) => dispatch({ type: types.CATALOG, mode: types.CATALOG })}>
							<Icon name="bitcoin" size="large" />
							<span style={{ color: 'white' }}>Buy Moto</span>
						</Menu.Item>
					)}
				{(mode === types.CHECK_OUT || mode === types.QUICK_BUY)
					&& (
						<Menu.Menu>
							<Menu.Item
								active={activeItem === 'payment'}
								name="buy moto"
								onClick={(e, { name }) => dispatch({ type: types.CATALOG, mode: types.CATALOG })}>
								<Icon name="angle left" size="large" />
							</Menu.Item>
							<Menu.Item>
								<span><h3>Payment Details</h3></span>
							</Menu.Item>
						</Menu.Menu>
					)}
				<Menu.Menu position="right">
					<Menu.Item>
						<Input icon="search" placeholder="Search..." />
					</Menu.Item>
					<Menu.Item
						as="a"
						onClick={() => dispatch({ type: types.OPEN_CART })}
						style={{ paddingTop: '10px' }}>
						<Icon name="cart" size="large" style={{ color: 'white' }} />
						{' '}
						<span style={{ color: 'white' }}>Cart</span>
						{totalItems !== 0 && (
							<Label circular color="red" floating size="small">
								{totalItems}
							</Label>
						)}
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</Segment>
	);
};

export default Navbar;