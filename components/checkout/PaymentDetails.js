import React, { useState } from 'react';
import {
	Checkbox, Dropdown, Form, Input, Radio, Segment
} from 'semantic-ui-react';

const PaymentDetails = () => {
	const [cardType, setCardType] = useState('');

	const options1 = [
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

	const options2 = [
		{ key: 20, text: '20', value: 21 },
		{ key: 21, text: '21', value: 22 },
		{ key: 22, text: '22', value: 23 },
		{ key: 23, text: '23', value: 24 },
		{ key: 24, text: '24', value: 25 },
		{ key: 25, text: '25', value: 26 },
	];

	return (
		<div>
			<Segment>
				<span>Card Holder Name</span>
				<Input fluid placeholder="First Name" />
				<br />
				<span>Middle Name</span>
				<Input fluid placeholder="Middle Name" />
				<br />
				<span>Last Name</span>
				<Input fluid placeholder="Last Name" />
				<Segment basic>
					<Form.Field>
						<Radio
							checked={cardType === 'Debit'}
							label="Debit"
							name="radioGroup"
							onChange={() => setCardType('Debit')}
							value="Debit"
						/>
					</Form.Field>
					<Form.Field>
						<Radio
							checked={cardType === 'Credit'}
							label="Credit"
							name="radioGroup"
							onChange={() => setCardType('Credit')}
							value="Credit"
						/>
					</Form.Field>
					<br />
					<span>{`${cardType} Card Exp Date: `}</span>
					<br />
					<Input floated="left" placeholder="Card Number" />

					<Dropdown compact options={options1} selection text="Month" />

					<Dropdown compact options={options2} selection text="Year" />

					<Input floated="right" floated="right" placeholder="CVC" style={{ width: '60px' }} />

				</Segment>

				<Checkbox label="I accept the Terms and Condition" />
			</Segment>
		</div>
	);
};

export default PaymentDetails;