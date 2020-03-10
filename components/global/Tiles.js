import { Container, Row, Col } from 'react-bootstrap';

import ProductCard from '../product/ProductCard';



const initialData = [
    {
        product_name: 'Super Drill',
        price: 200,
        description: 'Butas na butas'
    },
    {
        product_name: 'Super Drill',
        price: 200,
        description: 'Butas na butas'
    }
    ,
    {
        product_name: 'Super Drill',
        price: 200,
        description: 'Butas na butas'
    }
    ,
    {
        product_name: 'Super Drill',
        price: 200,
        description: 'Butas na butas'
    },
    {
        product_name: 'Super Drill',
        price: 200,
        description: 'Butas na butas'
    },
    {
        product_name: 'Super Drill',
        price: 200,
        description: 'Butas na butas'
    }
];

const Tiles = () => {
    return (
        <div>
            <Container>
                <Row>
                    {
                        //initialData.map(data => <Col sm><ProductCard /></Col>)
                        <Col sm><ProductCard /></Col>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Tiles;