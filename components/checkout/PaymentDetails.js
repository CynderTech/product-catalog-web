import React from 'react';
import {
	Checkbox, Dropdown, Form, Input, Radio, Segment
} from 'semantic-ui-react';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';

const expMonthOption = [
	{ key: 1, text: '01', value: 1 },
	{ key: 2, text: '02', value: 2 },
	{ key: 3, text: '03', value: 3 },
	{ key: 4, text: '04', value: 4 },
	{ key: 5, text: '05', value: 5 },
	{ key: 6, text: '06', value: 6 },
	{ key: 7, text: '07', value: 7 },
	{ key: 8, text: '08', value: 8 },
	{ key: 9, text: '09', value: 9 },
	{ key: 10, text: '10', value: 10 },
	{ key: 11, text: '11', value: 11 },
	{ key: 12, text: '12', value: 12 }
];

const expYearOption = [
	{ key: 20, text: '20', value: 20 },
	{ key: 21, text: '21', value: 21 },
	{ key: 22, text: '22', value: 22 },
	{ key: 23, text: '23', value: 23 },
	{ key: 24, text: '24', value: 24 },
	{ key: 25, text: '25', value: 25 },
	{ key: 26, text: '26', value: 26 },
	{ key: 27, text: '27', value: 27 },
	{ key: 28, text: '28', value: 28 },
	{ key: 29, text: '29', value: 29 },
	{ key: 30, text: '30', value: 30 },
];

const PaymentDetails = () => {
	const [{ paymentDetails }, dispatch] = useGlobalState();

	const {
		cardNumber,
		cardType,
		cvc,
		firstName,
		lastName,
		middleName
	} = paymentDetails;

	return (
		<Segment>
			<span>Card Holder Name</span>
			<Input
				fluid
				onChange={e => dispatch({ type: types.PAYMENT_DETAILS, firstName: e.target.value })}
				placeholder="First Name"
				type="text"
				value={firstName}
			/>
			<br />
			<span>Middle Name</span>
			<Input
				fluid
				onChange={e => dispatch({ type: types.PAYMENT_DETAILS, middleName: e.target.value })}
				placeholder="Middle Name"
				type="text"
				value={middleName}
			/>
			<br />
			<span>Last Name</span>
			<Input
				fluid
				onChange={e => dispatch({ type: types.PAYMENT_DETAILS, lastName: e.target.value })}
				placeholder="Last Name"
				type="text"
				value={lastName}
			/>
			<Segment>
				<Form.Field>
					<Radio
						checked={cardType === 'Debit'}
						label="Debit"
						name="radioGroup"
						onChange={() => dispatch({ type: types.PAYMENT_DETAILS, cardType: 'Debit' })}
						value="Debit"
					/>
				</Form.Field>
				<Form.Field>
					<Radio
						checked={cardType === 'Credit'}
						label="Credit"
						name="radioGroup"
						onChange={() => dispatch({ type: types.PAYMENT_DETAILS, cardType: 'Credit' })}
						value="Credit"
					/>
				</Form.Field>
				<br />
				<span>{`${cardType || ''} Card Exp Date: `}</span>
				<br />
				<span>
					<Input
						floated="left"
						onChange={e => dispatch({ type: types.PAYMENT_DETAILS, cardNumber: e.target.value })}
						placeholder="Card Number"
						value={cardNumber}
					/>
					{' '}
				</span>
				<span>
					<Dropdown compact onChange={(e, data) => dispatch({ type: types.PAYMENT_DETAILS, expMonth: data.value })} options={expMonthOption} placeholder="Month" selection />
					{' '}
				</span>
				<span>
					<Dropdown compact onChange={(e, data) => dispatch({ type: types.PAYMENT_DETAILS, expYear: data.value })} options={expYearOption} placeholder="Year" selection />
					{' '}
				</span>

				<Input
					floated="right"
					onChange={e => dispatch({ type: types.PAYMENT_DETAILS, cvc: e.target.value })}
					placeholder="CVC"
					style={{ width: '60px' }}
					value={cvc}
				/>

			</Segment>

			<Checkbox label="I accept the Terms and Condition" />
		</Segment>
	);
};

export default PaymentDetails;