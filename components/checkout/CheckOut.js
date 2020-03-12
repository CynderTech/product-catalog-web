import React from 'react'
import { Card, Button, Grid, Image } from 'semantic-ui-react'
import ListItem from './ListItem';
import PaymentDetails from './PaymentDetails';
import { useGlobalState } from '../global/useGlobalState';

const CheckOut = () => {
    const [{ mode, cart, selectedProduct }, dispatch] = useGlobalState();
    let orders = [];
    console.log(' Cartsu', cart);
    console.log(' selected Producto', selectedProduct);
    if (mode === 'check-out') orders = cart;
    if (mode === 'quick-buy') orders = [{ ...selectedProduct }];

    const total = orders.reduce((a, b) => a + (b['price'] || 0), 0);
    console.log('checkout is open');
    return (
        <React.Fragment>
            <Grid columns={2} divided>
                <Grid.Column>
                    <h3>Payment Details</h3>
                </Grid.Column>
                <Grid.Column>
                    <h3>Products</h3>
                    {orders.map(order => <ListItem data={order} />)}
                </Grid.Column>
            </Grid>

        </React.Fragment>
    )
};


export default CheckOut;