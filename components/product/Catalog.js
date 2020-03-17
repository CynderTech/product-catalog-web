
import React from 'react';
import {
	Container, Breadcrumb, Divider, Grid, Image, Segment
} from 'semantic-ui-react';
import * as types from '../global/types';

import CheckOut from '../checkout/CheckOut';
import ProductGrid from './ProductGrid';
import ProductDetails from './ProductDetails';

import { useGlobalState } from '../global/useGlobalState';

const Catalog = () => {
	const [{ mode }, dispatch] = useGlobalState();

	return (
		<div>
			{(mode === types.CATALOG && <ProductGrid />)
				|| ((mode === types.QUICK_BUY || mode === types.CHECK_OUT) && <CheckOut />)
				|| (mode === types.VIEW_PRODUCT && <ProductDetails />)}
		</div>
	);
};

export default Catalog;
