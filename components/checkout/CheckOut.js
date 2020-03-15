import React from 'react'
import { Card, Button, Grid, Header, Divider, Container, Segment } from 'semantic-ui-react'
import numeral from 'numeral';
import ListItem from './ListItem';
import * as types from '../global/types';
import PaymentDetails from './PaymentDetails';
import { useGlobalState } from '../global/useGlobalState';
import { checkOut } from '../product/catalogLibrary';
import axios from 'axios';

const testKey = 'pk_test_ByCem47H6hkGNUxFU2N7UvDk';
/**
 * https://developers.paymongo.com/docs/authentication
 */
const base64encoded = Buffer.from(testKey).toString('base64');

var options = {
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

axios(options)
    .then(response => console.log(response.data))
    .catch(err => console.log(JSON.stringify(err.response.data)));

const CheckOut = () => {
    const [{ mode, cart, selectedProduct }, dispatch] = useGlobalState();
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
                    <h5><PaymentDetails /></h5>
                    <form class="ui form">
                        <div class="field">
                            <label>First Name *</label>
                            <input placeholder="First_Name" />
                        </div>
                        <div class="field">
                            <label>Middle Name</label>
                            <input placeholder="Middle_Name" />
                        </div>
                        <div class="field">
                            <label>Last Name *</label>
                            <input placeholder="Last_Name" />
                        </div>
                        <div class="field">
                            <label>Credit Card Number *</label>
                            <input placeholder="Credid_Card_Number" />
                        </div>
                        <div class="field">
                            <label>Exp_Month *</label>
                            <input placeholder="Exp_Month" />
                        </div>
                        <div class="field">
                            <label>Exp_Year *</label>
                            <input placeholder="Exp_Year" />
                        </div>
                        <div class="field">
                            <label>CVC *</label>
                            <input placeholder="CVC" />
                        </div>
                        <div class="field">
                            <div class="ui checkbox">
                                <input type="checkbox" class="hidden" readonly="" tabindex="0" />
                                <label>I agree to the Terms and Conditions</label>
                            </div>
                        </div>
                    </form>
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
                                    <Button basic color='red' floated='left'>Place Order</Button>
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