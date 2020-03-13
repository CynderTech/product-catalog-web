import React from 'react'
import { Card, Button, Grid, Header, Divider, Container, Segment } from 'semantic-ui-react'
import ListItem from './ListItem';
import * as types from '../global/types';
import PaymentDetails from './PaymentDetails';
import { useGlobalState } from '../global/useGlobalState';

const CheckOut = () => {
    const [{ mode, cart, selectedProduct }, dispatch] = useGlobalState();
    let orders = [];
    console.log(' Cartsu', cart);
    console.log(' selected Producto', selectedProduct);
    if (mode === types.CHECK_OUT) orders = cart;

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
                            <input placeholder="First Name" />
                        </div>
                        <div class="field">
                            <label>Middle Name</label>
                            <input placeholder="Middle Name" />
                        </div>
                        <div class="field">
                            <label>Last Name *</label>
                            <input placeholder="Last Name" />
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
                            <input placeholder="Exp_Yer" />
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
                                <Grid.Column >
                                    <p>{` Order Total (${totalItems} Items ) |  P${total}`}</p>
                                    <p>{` Shipping fee: P50`}</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Total Payment: P{total + 50}</h4>
                                    <Button color='red' basic floated='left'>Place Order</Button>
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