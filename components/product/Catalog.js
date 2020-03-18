
import React from 'react';
import * as types from '../global/types';
import CheckOut from '../checkout/CheckOut';
import ProductGrid from './ProductGrid';
import ProductDetails from './ProductDetails';
import ThankYouPage from '../ThankYouPage';

import { useGlobalState } from '../global/useGlobalState';

const Catalog = () => {
	const [{ mode }, dispatch] = useGlobalState();

	return (
		<div>
			{(mode === types.CATALOG && <ProductGrid />)
				|| ((mode === types.QUICK_BUY || mode === types.CHECK_OUT) && <CheckOut />)
				|| (mode === types.VIEW_PRODUCT && <ProductDetails />)
				|| ((mode === types.PAYMENT_SUCCESS || mode === types.PAYMENT_ERROR) && <ThankYouPage />)}
		</div>
	);
};

export default Catalog;
