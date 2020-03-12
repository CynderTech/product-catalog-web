import React from 'react'
import { Card, Button, Icon, Image } from 'semantic-ui-react'
import { useGlobalState } from '../global/useGlobalState';

const ListItem = ({ data }) => {
    const { img, name, desc, qty, price } = data;
    const [{ mode, cart, selectedProduct }, dispatch] = useGlobalState();
    console.log('list itemmmm');
    return (
        <Card>
            <Card.Content>
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
            </Card.Content>
            <Card.Content extra textAlign="right">
                <div>
                    <a>
                        <Icon name='dollar' />
                        {price}
                    </a>

                </div>
            </Card.Content>
            <Card.Content extra textAlign="right">
                <div>
                    <Button.Group basic size='mini'>
                        <Button onClick={() => { }}>+</Button>
                        <Button onClick={() => { }}>-</Button>
                    </Button.Group>
                    <a> <Icon />
                        <span>{qty ? `x${qty}` : `x${1}`}</span>
                    </a>
                </div>
            </Card.Content>
            <Card.Content extra textAlign="right">
                <div>

                    <a>Total
                        <Icon floated='right' name='dollar' />
                        <span>{`${qty ? qty : 1 * price}`}</span>
                    </a>
                </div>
            </Card.Content >
        </Card >
    );
};




export default ListItem;