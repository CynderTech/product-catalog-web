
import React from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import numeral from 'numeral';
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
                <span>{numeral(price || 0).format('$ 0,0.00')}</span>
                <Card.Meta>
                    <a>
                        category
                    </a>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button.Group fluid basic size='mini'>
                    <Button onClick={() => dispatch({ type: types.VIEW_PRODUCT, selectedProduct: data })}>
                        View
                    </Button>
                    <Button onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: data })}>
                        <Icon color='red' name='add to cart' /> Add to Cart
                    </Button>
                    <Button basic onClick={() => dispatch({ type: types.QUICK_BUY, selectedProduct: data })} >
                        Buy Now
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ProductCard;