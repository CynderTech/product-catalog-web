
import Catalog from '../product/Catalog';
import CheckOut from '../checkout/CheckOut';
import ProductDetails from '../product/ProductDetails';
import { useGlobalState } from '../global/useGlobalState';

const Frame = () => {
    const [{ mode }, dispatch] = useGlobalState();
    console.log('modeee', mode);
    return (
        <div center>
            {(mode === 'catalog' && <Catalog />)
                || (mode === 'check-out' && <CheckOut />)
                || (mode === 'product-view' && <ProductDetails />)}
        </div>
    )
}

export default Frame;