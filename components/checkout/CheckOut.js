import React, { useState } from 'react'
import { Card, Button, Grid, Header, Divider, Container, Segment, Form, Label, Input } from 'semantic-ui-react'
import numeral from 'numeral';
import ListItem from './ListItem';
import * as types from '../global/types';
import PaymentDetails from './PaymentDetails';
import { useGlobalState } from '../global/useGlobalState';
import { checkOut } from '../product/catalogLibrary';
import axios from 'axios';

const testKey = 'pk_test_1FZShWVgMRgWhXBphmMBE2tp';
/**
 * https://developers.paymongo.com/docs/authentication
 */
const base64encoded = Buffer.from(testKey).toString('base64');

var createToken = {
    method: 'POST',
    url: 'https://api.paymongo.com/v1/tokens',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${base64encoded}`,
    },
    /**
     * instead of putting it in the "headers" option, using "json" option allows
     * you to put "body" as an option as well
     */
    data: {
        data: {
            attributes: {
                number: '4123450131000508',
                exp_month: 7,
                exp_year: 25,
                cvc: '123',
            }
        }
    }
};

var createPayment = {
    method: 'POST',
    url: 'https://api.paymongo.com/v1/payments',
    headers: {
        'Accept': 'application/json', 
        'content-type': 'application/json',
        'Authorization': `Basic ${base64encoded}`,
    },
    data: {
        data: {
            attributes: {
                amount: '1250',
                id: 'tok_hN9bi7ZePg1URYbeEks67eqK',
                type: 'token',
            }
        }
    }
}

axios(createToken)
    .then(response => console.log('Check1: ', response.data))
    .catch(err => console.log('Error1Check', JSON.stringify(err.response.data)));

axios(createPayment)
    .then(response => console.log('Check2: ', response.data))
    .catch(err => console.log('Error2Check: ', JSON.stringify(err.response.data)));

const CheckOut = () => {
    const [{ mode, cart, selectedProduct }, dispatch] = useGlobalState();

    const [{first_name}, setFirstName] = useState({first_name: ''});
    const [{middle_name}, setMiddleName] = useState({middle_name: ''});
    const [{last_name}, setLastName] = useState({last_name: ''});
    const [{credit_card_number}, setCreditCard] = useState({credit_card_number: ''});
    const [{exp_month}, setExpMonth] = useState({exp_month: ''});
    const [{exp_year}, setExpYear] = useState({exp_year: ''});
    const [{cvc}, setCvc] = useState({cvc: ''});


    let orders = [];
    console.log(' Cartsu', cart);
    console.log(' selected Producto', selectedProduct);
    if (mode === types.CHECK_OUT) orders = checkOut(cart);

    if (mode === types.QUICK_BUY && selectedProduct.id) orders = [{ ...selectedProduct }];

    const totalItems = orders.reduce((a, b) => a + (b['qty'] || 0), 0);
    const total = orders.reduce((a, b) => a + (b['price'] * b['qty'] || 0), 0);

    return (
        <React.Fragment>
            <Grid columns={2} divided>
                <Grid.Column>
                    <Header as='h3'>
                        Payment Details
                    </Header>
                    <Divider clearing />
                    <Form>
                        <Form.Field>
                            <Label>First Name *</Label>
                            <Input 
                                onChange={(e) => setFirstName({ first_name: e.target.value})}
                                placeholder='First Name' 
                                value={first_name}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>Middle Name</Label>
                            <Input 
                                onChange={(e) => setMiddleName({ middle_name: e.target.value})}
                                placeholder='Middle Name'
                                value={middle_name}                               
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>Last Name *</Label>
                            <Input 
                                onChange={(e) => setLastName({ last_name: e.target.value})}
                                placeholder='Last Name' 
                                value={last_name}                                
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>Credit Card Number *</Label>
                            <Input 
                                onChange={(e) => setCreditCard({ credit_card_number: e.target.value})}
                                placeholder="Credid Card Number" 
                                value={credit_card_number}                               
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>Exp_Month *</Label>
                            <Input 
                                onChange={(e) => setExpMonth({ exp_month: e.target.value})}
                                placeholder="Expiration Month" 
                                value={exp_month}                               
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>Exp_Year *</Label>
                            <Input 
                                onChange={(e) => setExpYear({ exp_year: e.target.value})}
                                placeholder="Expiration Year" 
                                value={exp_year}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>CVC *</Label>
                            <Input 
                                onChange={(e) => setCvc({ cvc: e.target.value})}
                                placeholder="CVC" 
                                value={cvc}
                            />
                        </Form.Field>
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <Header as='h3'>
                        Products
                    </Header>
                    <Divider clearing />
                    <Grid row={2} divided>
                        <Grid.Row style={{ overflow: 'auto', maxHeight: '50vh' }}>
                            {orders.map(order => <ListItem data={order} />)}
                        </Grid.Row>
                        <Grid.Row fluid>
                            <Grid celled columns={2} >
                                <Grid.Column floated='left' >
                                    <p>{` Order Total (${totalItems} Items ) | ${numeral(total || 0).format('$ 0,0.00')}`}</p>
                                    <p>{` Shipping fee: P50`}</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Total Payment {numeral(total !== 0 ? total + 50 : 0).format('$ 0,0.00')}</h4>
                                    <Button basic color='red' floated='left'
                                        onClick = {()=> { 
                                            console.log("First Name: ", first_name);
                                            console.log("Middle Name: ", middle_name);
                                            console.log("Last Name: ", last_name);
                                            console.log("Credit: ", credit_card_number);
                                            console.log("Exp Month: ", exp_month);
                                            console.log("Exp Year: ", exp_year);
                                            console.log("CVC: ", cvc);
                                        }}
                                    >Place Order</Button>
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>

        </React.Fragment >
    )
};

export default CheckOut;