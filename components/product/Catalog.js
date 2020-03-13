
import React, { Component } from 'react'
import { Container, Breadcrumb, Divider, Grid, Image, Segment } from 'semantic-ui-react'
import * as types from '../global/types';

import CheckOut from '../checkout/CheckOut';
import ProductGrid from '../product/ProductGrid';
import ProductDetails from '../product/ProductDetails';

import { useGlobalState } from '../global/useGlobalState';

const Catalog = () => {
    const [{ mode }, dispatch] = useGlobalState();

    return (
        <Segment>
            {(mode === types.CATALOG && <ProductGrid />)
                || ((mode === types.QUICK_BUY || mode === types.CHECK_OUT) && <CheckOut />)
                || (mode === types.VIEW_PRODUCT && <ProductDetails />)}
        </Segment>
    )
}

export default Catalog;
