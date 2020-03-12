
import React from 'react';
import Link from 'next/link';
import { Button, Icon, Input, Label, Menu, Segment } from 'semantic-ui-react'
import * as types from '../components/global/types';
import { useGlobalState } from '../components/global/useGlobalState';

const Navbar = () => {
    const [{ activeItem, cart }, dispatch] = useGlobalState();
    console.log('activeItem', activeItem)
    return (
        <Segment>
            <Menu primary>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={(e, { name }) => dispatch({ type: types.CATALOG })}
                />
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={(e, { name }) => dispatch({ type: types.PAGE, activeItem: name })}
                />
                <Menu.Item
                    name='friends'
                    active={activeItem === 'friends'}
                    onClick={(e, { name }) => dispatch({ type: types.PAGE, activeItem: name })}
                />
                <Menu.Menu position='right'>

                    <Menu.Item as='a'
                        onClick={() => dispatch({ type: types.OPEN_CART })}>
                        <Icon name='cart' /> Cart
                    {cart.length !== 0 && <Label color='red' circular small floating>
                            {cart.length}
                        </Label>}
                    </Menu.Item>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={(e, { name }) => dispatch({ type: types.MODE, activeItem: name })}
                    />
                </Menu.Menu>
            </Menu>
        </Segment>

    )
}

export default Navbar