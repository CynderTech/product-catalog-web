
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
                        <Icon name='cart' />
                        My Cart
                    </Header>
                    <Button floated='right' color='green' basic onClick={() => dispatch({ type: types.CHECK_OUT })}>Check Out</Button>
                </Segment>
                <Segment raised style={{ overflow: 'auto', maxHeight: 'auto' }}>
                    <Item.Group divided>
                        {cart.map(item => (

                            <Item>
                                <Item.Content>
                                    <Checkbox floated='left' defaultChecked />
                                </Item.Content>
                                <Item.Content>
                                    <Item.Image floated='left' size='tiny' src={item.img} />
                                    <Item.Header as='a'>{item.name}</Item.Header>
                                    <Item.Meta>P{item.price}</Item.Meta>
                                    <Item.Description>
                                        {item.desc}
                                    </Item.Description>
                                </Item.Content>
                                <Item.Content>
                                    <Input size='tiny' labelPosition='right' type='number' placeholder='Amount'>
                                        <Button.Group size='tiny'>
                                            <Button icon='add' />
                                            <input style={{ width: "30px" }} />
                                            <Button icon='minus' />
                                        </Button.Group>
                                    </Input>
                                </Item.Content>
                            </Item>
                        ))}
                    </Item.Group>
                </Segment>

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