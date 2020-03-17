
import React from 'react';
import Link from 'next/link';
import {
	Button, Divider, Icon, Header, Card, Input, Label, Item, Checkbox, Menu, Segment, Sidebar
} from 'semantic-ui-react';
import numeral from 'numeral';
import * as types from './global/types';
import { useGlobalState } from './global/useGlobalState';
import { checkOut } from './product/catalogLibrary';

const Navbar = props => {
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
				<Segment raised style={{ paddingBottom: '30px' }}>
					<Header>
						<span style={{ color: 'grey' }}>
							<Icon color="grey" name="cart" />
							Cart Moto
						</span>
					</Header>
				</Segment>
				{cart.length !== 0
					? (
						<Item.Group
							divided
							style={{
								marginTop: '0px',
								marginLeft: '10px',
								overflow: 'auto',
								marginBottom: '0px',
							}}>
							{cart.map(item => (
								<Item
									key={`${item.id}`}>
									<Item.Content>
										<Checkbox
											defaultChecked
											floated="left"
											onChange={(e, props) => dispatch({ type: types.SELECT_PRODUCT, selectedProduct: { ...item, checked: props.checked } })}
										/>
									</Item.Content>
									<Item.Content>
										<Item.Image floated="left" rounded size="tiny" src={item.img} />
									</Item.Content>
									<Item.Content>
										<Header
											as="h5"
											style={{
												width: '150px',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												textOverflow: 'ellipsis'
											}}>
											{item.name}
										</Header>
										<Item.Meta floated="right">
											<span style={{ color: 'green' }}>{numeral(item.price || 0).format('$ 0,0.00')}</span>
										</Item.Meta>
										{/* <Item.Description>
                                     <p style={{
                                         width: "100px",
                                         whiteSpace: "nowrap",
                                         overflow: "hidden",
                                         textOverflow: "ellipsis"
                                     }}>  {item.desc}</p>
                                 </Item.Description> */}
										<Input>
											<Button.Group basic floated="left" size="mini">
												<Button icon="minus" onClick={() => dispatch({ type: types.REMOVE_FROM_CART, selectedProduct: item })} />
												<input
													onChange={e => console.log(e.target.value)}
													style={{
														width: '50px',
														textAlign: 'center',
														fontSize: '10px',
														borderStyle: 'groove',
													}}
													value={item.qty}
												/>
												<Button icon="add" onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: item })} />
											</Button.Group>
										</Input>
									</Item.Content>
									<Item.Content />
								</Item>
							))}
						</Item.Group>
					) : (
						<Segment placeholder>
							<Header icon>
								<span style={{ color: 'grey' }}>
									<Icon name="cart arrow down" />
									You have no items in your shopping cart
								</span>
							</Header>
						</Segment>
					)}
				<Segment raised>
					<span floated="left">
						{'Total: '}
						<span style={{ color: 'green' }}>{numeral(total || 0).format('$ 0,0.00')}</span>
					</span>
					<Button basic color="red" disabled={checkOut(cart).length === 0} floated="left" floated="right" floated="right" onClick={() => dispatch({ type: types.CHECK_OUT })} size="tiny">Check Out</Button>
				</Segment>
			</Sidebar>
			<Sidebar.Pusher>
				<Segment.Group>
					<Segment basic style={{ paddingTop: '5px', paddingBottom: '5px' }}>
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
							{mode === types.CHECK_OUT
								&& (
									<Menu.Item
										active={activeItem === 'payment'}
										name="buy moto"
										onClick={(e, { name }) => dispatch({ type: types.CATALOG, mode: types.CATALOG })}>
										<Icon name="angle left" size="large" />
										{/* <span style={{ color: 'white' }}>Payment Details</span> */}
									</Menu.Item>
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
					<Segment secondary style={{ overflow: 'auto', maxHeight: '90vh' }}>
						{props.children}
					</Segment>
				</Segment.Group>
			</Sidebar.Pusher>
		</Sidebar.Pushable>

	);
};

export default Navbar;