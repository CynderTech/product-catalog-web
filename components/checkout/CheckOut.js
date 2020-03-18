import React, { useState } from 'react';
import {
	Card, Button, Grid, Header, Divider, Container, Segment, Form, Label, Input
} from 'semantic-ui-react';
import numeral from 'numeral';
import axios from 'axios';
import ListItem from './ListItem';
import * as types from '../global/types';
import PaymentDetails from './PaymentDetails';
import { useGlobalState } from '../global/useGlobalState';
import { checkOut } from '../product/catalogLibrary';

const placeOrder = (data) => {
	console.log('passs the data from parameter if you need something from the main function', data);
	console.log('you can put calls and everything');

	// axios(createToken)
	//     .then(response => console.log('Check1: ', response.data))
	//     .catch(err => console.log('Error1Check', JSON.stringify(err.response.data)));

	// axios(createPayment)
	//     .then(response => console.log('Check2: ', response.data))
	//     .catch(err => console.log('Error2Check: ', JSON.stringify(err.response.data)));
};

const CheckOut = () => {

	const [{ cart, mode, selectedProduct }, dispatch] = useGlobalState();
	const [{ first_name }, setFirstName] = useState({ first_name: '' });
	const [{ middle_name }, setMiddleName] = useState({ middle_name: '' });
	const [{ last_name }, setLastName] = useState({ last_name: '' });
	const [{ credit_card_number }, setCreditCard] = useState({ credit_card_number: '' });
	const [{ exp_month }, setExpMonth] = useState({ exp_month: '' });
	const [{ exp_year }, setExpYear] = useState({ exp_year: '' });
	const [{ cvc }, setCvc] = useState({ cvc: '' });

	let items = [];

	if (mode === types.CHECK_OUT) items = cart.filter(item => item.checked === true);
	if (mode === types.QUICK_BUY) items.push(selectedProduct);

	const totalItems = items.reduce((a, b) => a + (b.qty || 0), 0);
	const total = items.reduce((a, b) => a + (b.price * b.qty || 0), 0);

	const constructYourHeaderHere = {
		data: 'data'
	};

	return (
		<>
			<Grid columns={2} divided>
				<Grid.Column>
					{/* <Header as="h3">
						{' < Billing Details'}
					</Header>
					<Divider clearing /> */}
					<PaymentDetails />
					{/* <Form>
						<Form.Field>
							<Label>First Name *</Label>
							<Input
								onChange={e => setFirstName({ first_name: e.target.value })}
								placeholder="First Name"
								value={first_name}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Middle Name</Label>
							<Input
								onChange={e => setMiddleName({ middle_name: e.target.value })}
								placeholder="Middle Name"
								value={middle_name}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Last Name *</Label>
							<Input
								onChange={e => setLastName({ last_name: e.target.value })}
								placeholder="Last Name"
								value={last_name}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Credit Card Number *</Label>
							<Input
								onChange={e => setCreditCard({ credit_card_number: e.target.value })}
								placeholder="Credid Card Number"
								value={credit_card_number}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Exp_Month *</Label>
							<Input
								onChange={e => setExpMonth({ exp_month: e.target.value })}
								placeholder="Expiration Month"
								value={exp_month}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Exp_Year *</Label>
							<Input
								onChange={e => setExpYear({ exp_year: e.target.value })}
								placeholder="Expiration Year"
								value={exp_year}
							/>
						</Form.Field>
						<Form.Field>
							<Label>CVC *</Label>
							<Input
								onChange={e => setCvc({ cvc: e.target.value })}
								placeholder="CVC"
								value={cvc}
							/>
						</Form.Field>
					</Form> */}
				</Grid.Column>
				<Grid.Column>
					{/* <Header as="h3">
						Check Out
					</Header>
					<Divider /> */}
					{/* divided
						row={1}
						style={{
							marginLeft: '10px', marginRight: '30px', overflow: 'auto', maxHeight: '50vh'
						}}
						textAlign="center"> */}
					<Card.Group style={{
						overflow: 'auto', maxHeight: '70vh'
					}}>
						{items.map(item => <ListItem key={`${item.id}`} data={item} />)}
					</Card.Group>
					<Divider />
					<Grid
						as={Segment}
						celled
						columns={2}
						style={{
							height: '15vh',
						}}>
						<Grid.Column floated="left">
							<p>{` Order Total (${totalItems} Items ) | ${numeral(total || 0).format('$ 0,0.00')}`}</p>
							<p>{' Shipping fee: P50'}</p>
						</Grid.Column>
						<Grid.Column>
							<h4>
								<span>
									Total Payment:
									<span style={{ color: 'green' }}>{` ${numeral(total !== 0 ? total + 50 : 0).format('$ 0,0.00')}`}</span>
								</span>
							</h4>
							<Button
								basic
								color="red"
								floated="left"
								onClick={() => placeOrder(constructYourHeaderHere)}>
								Place Order
							</Button>
						</Grid.Column>
					</Grid>
				</Grid.Column>
			</Grid>
		</>
	);
};

export default CheckOut;
