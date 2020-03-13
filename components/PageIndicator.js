import React from 'react'
import { Container, Breadcrumb, Divider, Grid, Image, Segment } from 'semantic-ui-react'
import * as types from '../components/global/types';
import { useGlobalState } from '../components/global/useGlobalState';
const PageIndicator = () => {
    const [{ mode }, dispatch] = useGlobalState();
    let link = '';
    if (mode === types.CHECK_OUT || mode === types.QUICK_BUY) link = 'Check Out';
    if (mode === types.VIEW_PRODUCT || mode === types.VIEW_PRODUCT) link = 'Product Details';
    return (
        (mode !== types.CATALOG &&
            <Breadcrumb size='huge'>
                <Breadcrumb.Section onClick={() => dispatch({ type: types.CATALOG, mode: types.CATALOG })} link>Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='left chevron' />
                <Breadcrumb.Section link>{link}</Breadcrumb.Section>
                <Divider hidden />
            </Breadcrumb>
        )
    );
};

export default PageIndicator;