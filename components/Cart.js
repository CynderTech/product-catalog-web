
import React from 'react'
import { Button, Card, Checkbox, Grid, Ref, Header, Icon, Image, Input, Item, List, Menu, Rail, Segment, Sidebar, Sticky, Label } from 'semantic-ui-react'
import * as types from '../components/global/types';
import { useGlobalState } from './global/useGlobalState';


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
                onHide={() => dispatch({ type: openCart ? types.CLOSE_CART : types.OPEN_CART })}
                visible={openCart}
                width='wide'
            >
                <Segment>
                    <Header as='a'>
                        <Icon name='opencart' color='teal' />
                        My Cart
                    </Header>
                    <Button disabled={cart.length === 0} floated='right' size='tiny' color='red' basic onClick={() => dispatch({ type: types.CHECK_OUT })}>Check Out</Button>
                </Segment>
                {cart.length !== 0 ?
                    <Segment raised style={{ overflow: 'auto', maxHeight: 'auto' }}>
                        <Item.Group divided>
                            {cart.map(item => (
                                <Item>
                                    <Item.Content>
                                        <Checkbox floated='left' defaultChecked />
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
                                        <Item.Meta floated='right'>P{item.price}</Item.Meta>
                                        {/* <Item.Description>
                                     <p style={{
                                         width: "100px",
                                         whiteSpace: "nowrap",
                                         overflow: "hidden",
                                         textOverflow: "ellipsis"
                                     }}>  {item.desc}</p>
                                 </Item.Description> */}
                                        <Input basic fluid>
                                            <Button.Group fluid floated='left' basic size='mini'>
                                                <Button icon='add' onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: item })} />
                                                <input
                                                    value={item.qty}
                                                    style={{
                                                        width: "50px",
                                                        textAlign: "center",
                                                        fontSize: "10px",
                                                        borderStyle: "groove",
                                                    }} />
                                                <Button icon='minus' onClick={() => dispatch({ type: types.REMOVE_FROM_CART, selectedProduct: item })} />
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
                    <Segment>
                        <p color='grey'>Your Cart is empty</p>
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