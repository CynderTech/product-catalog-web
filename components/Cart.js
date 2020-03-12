
import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { useGlobalState } from './global/useGlobalState';

const Cart = (props) => {
    const [{ openCart }, dispatch] = useGlobalState();
    console.log('VISIBLE BA?', openCart);
    return (
        <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Menu}
                animation='overlay'
                direction='right'
                inverted
                vertical
                visible={openCart}
            >
                <Menu.Item as='a' header>
                    My Cart
          </Menu.Item>
                <Menu.Item as='a'>CART ITEM 1</Menu.Item>
                <Menu.Item as='a'>CART ITEM 1</Menu.Item>
                <Menu.Item as='a'>CART ITEM 1</Menu.Item>
                <Menu.Item as='a'>CART ITEM 1</Menu.Item>
                <Menu.Item as='a'>CART ITEM 1</Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
                <Segment basic>
                    {props.children}
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}

export default Cart;