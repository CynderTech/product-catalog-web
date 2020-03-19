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

const placeOrder = (data, converted, dispatch) => {
	const testKey = 'pk_test_1FZShWVgMRgWhXBphmMBE2tp';
	const skTest = 'sk_test_YXvSu6uthuoQwQgLWp8m4Ljb';
	/**
     * https://developers.paymongo.com/docs/authentication
     */
	const base64encoded = Buffer.from(testKey).toString('base64');
	const base64encodedNext = Buffer.from(skTest).toString('base64');

	const createToken = {
		method: 'POST',
		url: 'https://api.paymongo.com/v1/tokens',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			// 'Authorization': `Basic ${base64encoded}`,
		},
		data,
	};

	console.log('ptngina: ', createToken);

	axios(createToken)
		// .then(response => console.log('First Name: ', data))
		.then(response => {
			// const { data } = response;
			const { data } = response.data;

			// const { id, type } = data;
			const { id } = data;
			const { type } = data;

			console.log('Type', response);
			processPayment(id, type);
		})
		.catch(err => console.log('Error1Check: ', JSON.stringify(err.response.data)));
	// .catch(err => console.log('Error1Check: ', data));

	function processPayment(id, type) {
		const createPayment = {
			method: 'POST',
			url: 'https://api.paymongo.com/v1/payments',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// 'Authorization': `Basic ${base64encodedNext}`,
			},
			data: {
				data: {
					attributes: {
						amount: converted,
						currency: 'PHP',
						source: {
							id,
							type
						}
					}
				}
			}
		};

		console.log('att: ', createPayment);

		return axios(createPayment)
			.then(response => dispatch({ type: types.PAYMENT_SUCCESS }))
			.catch(err => dispatch({ type: types.PAYMENT_ERROR }));
	}
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
	const totalWithShipping = total + 50;
	const converted = totalWithShipping * 100;

	const constructYourHeaderHere = {
		data: {
			attributes: {
				number: cardNumber,
				exp_month: expMonth,
				exp_year: expYear,
				cvc,
			}
		}
	};

	return (
		<Grid columns={2}>
			<Grid.Column>
				<PaymentDetails />
			</Grid.Column>
			<Grid.Column style={{
				paddingBottom: 'auto',
			}}>
				<Card.Group style={{
					paddingBottom: '0px', overflow: 'auto', maxHeight: '70vh',
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
						position: 'relative',

					}}>
					<Grid.Column floated="left">
						<p>{` Order Total (${totalItems} Items ) | ${numeral(total || 0).format('$ 0,0.00')}`}</p>
						<p>{' Shipping fee: P50'}</p>
						<p
							style={{
								color: 'green',
								position: 'relative',
								left: '120px',
								bottom: '33px',
								fontSize: '10px'
							}}>
							{`Minimum purchase of ${numeral(100).format('$ 0,0.00')}`}
						</p>
					</Grid.Column>
					<Grid.Column>
						<h4>
							<span>
								Total Payment:
								<span style={{ color: 'green' }}>{` ${numeral(total !== 0 ? totalWithShipping : 0).format('$ 0,0.00')}`}</span>
							</span>
						</h4>
						<Button
							basic
							color="red"
							disabled={totalWithShipping < 100 || totalItems === 0}
							floated="left"
							fluid
							onClick={() => placeOrder(constructYourHeaderHere, converted, dispatch)}>
							Place Order
						</Button>
					</Grid.Column>
				</Grid>
			</Grid.Column>
		</Grid >
	);
};

export default CheckOut;
