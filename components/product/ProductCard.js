
import React from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import { useMicroState } from './microState';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';


const ProductCard = ({ data }) => {
    const { img, name, desc, price } = data;
    const [{ cart }, dispatch] = useGlobalState();

    return (
        <Card>
            <Image src={img} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <span>P{price}.00</span>
                <Card.Meta>
                    <a>
                        category
                    </a>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button.Group floated="center" fluid basic size='mini'>
                    <Button onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: data })}>
                        <Icon color='blue' name='chat' /> Chat
                </Button>
                    <Button onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: data })}>
                        <Icon color='red' name='add to cart' /> Add to Cart
                </Button>
                    <Button basic color='red' onClick={() => dispatch({ type: types.QUICK_BUY, selectedProduct: data })}>Buy Now</Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ProductCard;