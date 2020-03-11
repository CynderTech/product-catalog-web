
import Catalog from '../product/Catalog';
import CheckOut from '../checkout/CheckOut';
import ProductDetails from '../product/ProductDetails';
import { useGlobalState } from '../global/useGlobalState';
import { Container } from 'react-bootstrap'

const Frame = () => {
    const [{ mode }, dispatch] = useGlobalState();
    console.log('modeee', mode);
    return (
        <div className="">
            <Container className="border">
                {(mode === 'catalog' && <Catalog />)
                    || (mode === 'check-out' && <CheckOut />)
                    || (mode === 'product-view' && <ProductDetails />)}
            </Container>

        </div>
    )
}

export default Frame;