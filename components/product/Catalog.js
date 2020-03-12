
import React, { Component } from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'

import CheckOut from '../checkout/CheckOut';
import ProductGrid from '../product/ProductGrid';
import ProductDetails from '../product/ProductDetails';

import { useGlobalState } from '../global/useGlobalState';

const Catalog = () => {
    const [{ mode }, dispatch] = useGlobalState();
    console.log('modeee', mode);
    return (
        <React.Fragment>
            {(mode === 'catalog' && <ProductGrid />)
                || ((mode === 'check-out' || mode === 'quick-buy') && <CheckOut />)
                || (mode === 'product-view' && <ProductDetails />)}
        </React.Fragment>
    )
}

export default Catalog;
