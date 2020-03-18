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

const placeOrder = data => {

	const testKey = 'pk_test_1FZShWVgMRgWhXBphmMBE2tp';
	/**
     * https://developers.paymongo.com/docs/authentication
     */
	// const base64encoded = Buffer.from(testKey).toString('base64');

	// const createToken = {
	// 	method: 'POST',
	// 	url: 'https://api.paymongo.com/v1/tokens',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Accept: 'application/json',
	// 		// 'Authorization': `Basic ${base64encoded}`,
	// 	},
	// 	data: {
	// 		data: {
	// 			attributes: {
	// 				number: credit_card_number,
	// 				exp_month,
	// 				exp_year,
	// 				cvc,
	// 			},
	// 		}
	// 	}
	// };

	// axios(createToken)
	// 	.then(response => console.log('First Name: ', data))
	// 	// .then(response => console.log('Check1: ', response.data))
	// 	.catch(err => console.log('Data: ', data, 'Error1Check: ', JSON.stringify(err.response.data)));
	// .catch(err => console.log('Error1Check: ', data));

	// axios(createPayment)
	//     .then(response => console.log('Check2: ', response.data))
	//     .catch(err => console.log('Error2Check: ', JSON.stringify(err.response.data)));
};

const CheckOut = () => {
	const [{
		cart, mode, paymentDetails, selectedProduct
	}, dispatch] = useGlobalState();
	const {
		cardNumber,
		cardType,
		cvc,
		expMonth,
		expYear,
		firstName,
		lastName,
		middleName
	} = paymentDetails;

	let items = [];

	if (mode === types.CHECK_OUT) items = cart.filter(item => item.checked === true);
	if (mode === types.QUICK_BUY) items.push(selectedProduct);

	const totalItems = items.reduce((a, b) => a + (b.qty || 0), 0);
	const total = items.reduce((a, b) => a + (b.price * b.qty || 0), 0);

	const constructYourHeaderHere = {
		data: {
			data: {
				attributes: {
					number: cardNumber,
					exp_month: expMonth,
					exp_year: expYear,
					cvc,
				}
			}
		}
	};

	return (
		<Grid columns={2} divided>
			<Grid.Column>
				<PaymentDetails />
			</Grid.Column>
			<Grid.Column>
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
							onClick={() => {
								placeOrder(constructYourHeaderHere);
								dispatch({ type: types.THANK_YOU });
							}}>
							Place Order
						</Button>
					</Grid.Column>
				</Grid>
			</Grid.Column>
		</Grid>
	);
};

export default CheckOut;
