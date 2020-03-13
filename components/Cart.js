
import React from 'react'
import { Button, Card, Checkbox, Grid, Ref, Header, Icon, Image, Input, Item, List, Menu, Rail, Segment, Sidebar, Sticky, Label } from 'semantic-ui-react'
import * as types from '../components/global/types';
import { useGlobalState } from './global/useGlobalState';
import { checkOut } from '../components/product/catalogLibrary';

const Cart = (props) => {
    const [{ cart, openCart }, dispatch] = useGlobalState();

    return (
        <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Card}
                animation='overlay'
                direction='right'
                inverted
                vertical
                onHide={() => dispatch({ type: types.CLOSE_CART })}
                visible={openCart}
                width='wide'
            >
                <Segment>
                    <Header as='a'>
                        <Icon name='opencart' color='teal' />
                        Cart Moto
                    </Header>
                    <Button disabled={checkOut(cart).length === 0} floated='right' size='tiny' color='red' basic onClick={() => dispatch({ type: types.CHECK_OUT })}>Check Out</Button>
                </Segment>
                {cart.length !== 0 ?
                    <Segment raised style={{ overflow: 'auto', maxHeight: 'auto' }}>
                        <Item.Group divided>
                            {cart.map(item => (
                                <Item>
                                    <Item.Content>
                                        <Checkbox onChange={(e, props) =>
                                            dispatch({ type: types.CHECKED_PRODUCT, selectedProduct: { ...item, checked: props.checked } })}
                                            floated='left'
                                            defaultChecked />
                                    </Item.Content>
                                    <Item.Content>
                                        <Item.Image floated='left' size='tiny' src={item.img} />
                                    </Item.Content>
                                    <Item.Content>
                                        <Header as='h5' style={{
                                            width: "150px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {item.name}
                                        </Header>
                                        <Item.Meta floated='right'>P{item.price}.00</Item.Meta>
                                        {/* <Item.Description>
                                     <p style={{
                                         width: "100px",
                                         whiteSpace: "nowrap",
                                         overflow: "hidden",
                                         textOverflow: "ellipsis"
                                     }}>  {item.desc}</p>
                                 </Item.Description> */}
                                        <Input basic fluid>
                                            <Button.Group floated='left' basic size='mini'>
                                                <Button icon='minus' onClick={() => dispatch({ type: types.REMOVE_FROM_CART, selectedProduct: item })} />
                                                <input
                                                    value={item.qty}
                                                    style={{
                                                        width: "50px",
                                                        textAlign: "center",
                                                        fontSize: "10px",
                                                        borderStyle: "groove",
                                                    }} />
                                                <Button icon='add' onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: item })} />
                                            </Button.Group>
                                        </Input>
                                    </Item.Content>
                                    <Item.Content>
                                    </Item.Content>
                                </Item>
                            ))}
                        </Item.Group>
                    </Segment>
                    :
                    <Segment placeholder>
                        <Header icon>
                            <Icon name='cart arrow down' />
                            You have no items in your shopping cart
                        </Header>
                    </Segment>
                }


            </Sidebar >
            <Sidebar.Pusher>
                <Segment basic>
                    {props.children}
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable >
    )
}

export default Cart;