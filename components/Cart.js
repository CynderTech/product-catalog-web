
import React from 'react';
import {
	Button, Card, Checkbox, Grid, Ref, Header, Icon, Image, Input, Item, List, Menu, Rail, Segment, Sidebar, Sticky, Label
} from 'semantic-ui-react';
import numeral from 'numeral';
import * as types from './global/types';
import { useGlobalState } from './global/useGlobalState';
import { checkOut } from './product/catalogLibrary';

const Cart = props => {
	const [{ cart, openCart }, dispatch] = useGlobalState();

	return (
		<Sidebar.Pushable as={Segment}>
			<Sidebar
				animation="overlay"
				as={Card}
				direction="right"
				inverted="true"
				onHide={() => dispatch({ type: types.CLOSE_CART })}
				vertical="true"
				visible={openCart}
				width="wide">
				<Segment>
					<Header as="a">
						<Icon color="grey" name="cart" />
						<span style={{ color: 'grey' }}>Cart Moto</span>
					</Header>
					<Button basic color="red" disabled={checkOut(cart).length === 0} floated="right" onClick={() => dispatch({ type: types.CHECK_OUT })} size="tiny">Check Out</Button>
				</Segment>
				{cart.length !== 0
					? (
						<Segment raised style={{ overflow: 'auto', maxHeight: '100vh' }}>
							<Item.Group divided>
								{cart.map(item => (
									<Item key={`${item.id}`}>
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
						</Segment>
					)
					: (
						<Segment placeholder>
							<Header icon>
								<span style={{ color: 'grey' }}>
									<Icon name="cart arrow down" />
									You have no items in your shopping cart
								</span>
							</Header>
						</Segment>
					)}
			</Sidebar>
			<Sidebar.Pusher>
				<Segment >
					{props.children}
				</Segment>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
};

export default Cart;