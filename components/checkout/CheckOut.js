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

    const total = orders.reduce((a, b) => a + (b['price'] * b['qty'] || 0), 0);

    return (
        <React.Fragment>
            <Grid columns={2} divided>
                <Grid.Column>
                    <h3>Payment Details</h3>
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
                        <Grid.Row>
                            <Grid columns={2} divided>
                                <Grid.Column>
                                    <h5 floated='right'>{`Total: P${total}`}</h5>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button basic floated='right'>Place Order</Button>
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