import { CardColumns, Container, Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import ProductCard from '../product/ProductCard';
import { gql } from 'apollo-boost';

const ALL_PRODUCTS = gql`
    query {
        allProducts {
            name,
            desc,
            price
        }
    }
`
const dataMoto = [{
    name: 'Pawerr',
    desc: 'Kamottt',
    price: '200'
},
{
    name: 'Pawerr',
    desc: 'Kamottt',
    price: '200'
}];

const Tiles = () => {
    const { loading, error, data } = useQuery(ALL_PRODUCTS);
    // if (loading) return null;
    // if (error) return `Error! ${error}`;

    return (
        <div>
            <Container>
                <Row>
                    <CardColumns>
                        <Col sm>
                            {dataMoto.map(product =>
                                <ProductCard data={product} />
                            )}
                        </Col>
                    </CardColumns>
                </Row>
            </Container>
        </div>
    )
}

export default Tiles;