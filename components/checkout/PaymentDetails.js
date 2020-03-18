import React, { useState } from 'react';
import {
	Checkbox, Dropdown, Form, Input, Radio, Segment
} from 'semantic-ui-react';

const PaymentDetails = () => {
	const [cardType, setCardType] = useState('');
	const exp_month = [
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

	const exp_year = [
		{ key: 20, text: '20', value: 21 },
		{ key: 21, text: '21', value: 22 },
		{ key: 22, text: '22', value: 23 },
		{ key: 23, text: '23', value: 24 },
		{ key: 24, text: '24', value: 25 },
		{ key: 25, text: '25', value: 26 },
    ];

    const [{ first_name }, setFirstName] = useState({ first_name: '' });
	const [{ middle_name }, setMiddleName] = useState({ middle_name: '' });
	const [{ last_name }, setLastName] = useState({ last_name: '' });
	const [{ credit_card_number }, setCreditCard] = useState({ credit_card_number: '' });
	const [{ cvc }, setCvc] = useState({ cvc: '' });

	return (
		<div>
			<Segment>
				<span>Card Holder Name</span>
                <Input fluid 
                    placeholder="First Name" 
                    onChange={e => setFirstName({ first_name: e.target.value })}
                    value={first_name}
                />
				<br />
				<span>Middle Name</span>
                <Input fluid 
                    placeholder="Middle Name"
                    onChange={e => setMiddleName({ middle_name: e.target.value })}
                    value={middle_name}
                />
				<br />
				<span>Last Name</span>
                <Input fluid 
                    placeholder="Last Name"
                    onChange={e => setLastName({ last_name: e.target.value })}
                    value={last_name}
                />
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
                    <Input 
                        floated="left" 
                        placeholder="Card Number" 
                        onChange={e => setCreditCard({ credit_card_number: e.target.value })}
                        value={credit_card_number}
                    />

					<Dropdown compact options={exp_month} selection placeholder="Month" />

					<Dropdown compact options={exp_year} selection placeholder="Year" />

                    <Input basic 
                        floated="right" 
                        floated="right" 
                        placeholder="CVC" 
                        style={{ width: '60px' }} 
                        onChange={e => setCvc({ cvc: e.target.value })}
                        value={cvc}    
                    />

				</Segment>

				<Checkbox label="I accept the Terms and Condition" />
			</Segment>
		</div>
	);
};

export default PaymentDetails;