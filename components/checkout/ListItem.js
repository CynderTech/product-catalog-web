import React from 'react'
import { Card, Button, Icon, Image, Grid } from 'semantic-ui-react'
import numeral from 'numeral';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';

const ListItem = ({ data }) => {
    const { img, name, desc, qty, price } = data;
    const [{ mode, cart, selectedProduct }, dispatch] = useGlobalState();

    return (
        <Card fluid>

            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column>
                        <Image
                            floated='left'
                            size='tiny'
                            src={img}
                        />
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>category</Card.Meta>
                        <Card.Description>
                            {desc}
                        </Card.Description>
                    </Grid.Column>
                    <Grid.Column>
                        <Card.Content extra textAlign="right">
                            <div>
                                <a>
                                    {numeral(price || 0).format('$ 0,0.00')}
                                </a>

                            </div>
                        </Card.Content>
                        <Card.Content extra textAlign="right">
                            <div>
                                <Button.Group basic size='mini'>
                                    <Button onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: data })}>+</Button>
                                    <Button onClick={() => dispatch({ type: types.REMOVE_FROM_CART, selectedProduct: data })}>-</Button>
                                </Button.Group>
                                <a> <Icon />
                                    <span>{qty ? `x${qty}` : `x${1}`}</span>
                                </a>
                            </div>
                        </Card.Content>
                    </Grid.Column>
                </Grid>
            </Card.Content>
            <Card.Content extra textAlign="right">
                <div>
                    <a>Sub-Total:
                        <span>{` ${numeral(qty ? qty * price : 0 || 0).format('$ 0,0.00')}`}</span>
                    </a>
                </div>
            </Card.Content >
        </Card >
    );
};




export default ListItem;