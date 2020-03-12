
import React from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import { useMicroState } from './microState';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';


const ProductCard = ({ data }) => {
    const { img, name, desc, price } = data;
    const [{ cart }, dispatch] = useGlobalState();
    console.log('data datatata', data);
    return (
        <Card>
            <Image src={img} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <span className='date'>Category</span>
                </Card.Meta>
                <Card.Description>
                    {desc}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='dollar' />
                    {price}
                </a>
                <Button floated="right" icon="cart" onClick={() => dispatch({ type: 'add-to-cart', selectedProduct: data })} />
                <Button floated="right" onClick={() => dispatch({ type: 'quick-buy', mode: 'quick-buy', selectedProduct: data })}>Buy Now</Button>
            </Card.Content>
        </Card>
    )
}

export default ProductCard;