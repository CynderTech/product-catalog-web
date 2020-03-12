
import React, { Component } from 'react'
import { Container, Grid, Image, Segment } from 'semantic-ui-react'
import * as types from '../global/types';

import CheckOut from '../checkout/CheckOut';
import ProductGrid from '../product/ProductGrid';
import ProductDetails from '../product/ProductDetails';

import { useGlobalState } from '../global/useGlobalState';

const Catalog = () => {
    const [{ mode }, dispatch] = useGlobalState();
    console.log('modeee', mode);
    return (
        <div>
            {(mode === types.CATALOG && <ProductGrid />)
                || ((mode === types.QUICK_BUY || mode === types.CHECK_OUT) && <CheckOut />)
                || (mode === 'product-view' && <ProductDetails />)}
        </div>
    )
}

export default Catalog;
