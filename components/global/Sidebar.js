import React from 'react';
import {
	Button, Divider, Icon, Header, Card, Input, Label, Item, Checkbox, Menu, Segment, Sidebar
} from 'semantic-ui-react';
import * as types from './types';
import { useGlobalState } from './useGlobalState';
import Cart from '../Cart';
import CartItems from '../product/CartItem';

const SidebarX = props => {
	const [{
		activeItem, cart, mode, openCart
	}, dispatch] = useGlobalState();
	const totalItems = cart.reduce((a, b) => a + (b.qty || 0), 0);
	const total = cart.filter(item => item.checked === true).reduce((a, b) => a + (b.price * b.qty || 0), 0);

	return (
		<Sidebar.Pushable as={Segment} secondary>
			<Sidebar
				animation="overlay"
				as={Card}
				direction="right"
				inverted="true"
				onHide={() => dispatch({ type: types.CLOSE_CART })}
				vertical="true"
				visible={openCart}
				width="wide">
				<Cart>
					<CartItems />
				</Cart>
			</Sidebar>
			<Sidebar.Pusher>
				<Segment secondary style={{ overflow: 'auto', maxHeight: '90vh' }}>
					{props.children}
				</Segment>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
};

export default SidebarX;