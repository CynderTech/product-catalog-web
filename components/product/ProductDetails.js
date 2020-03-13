import React from 'react'
import { Container, Breadcrumb, Button, Divider, Icon, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { useMicroState } from './microState';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';

const ProductDetails = () => {
    const [{ mode }, dispatch] = useGlobalState();
    return (
        <div>
            <Segment placeholder>
                <Header icon>
                    <Icon name='pdf file outline' />
                    No documents are listed for this customer.
                </Header>
                <Button primary>Add Document</Button>
            </Segment>
        </div>
    )
}

export default ProductDetails;