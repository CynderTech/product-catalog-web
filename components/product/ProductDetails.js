import React from 'react';
import {
	Container, Breadcrumb, Item, Image, Divider, Icon, Grid, Header, Segment
} from 'semantic-ui-react';
import numeral from 'numeral';
import { useMicroState } from './microState';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';

const ProductDetails = () => {
	const [{ mode, selectedProduct }, dispatch] = useGlobalState();

	return (
		<Item.Group>
			<Item>
				<Item.Image rounded size="medium" src={`${process.env.CMS_BASE_URL}${((selectedProduct.file || {}).publicUrl || '')}`} />
				<Item.Content>
					<Item.Header as="a">
						<h1>
							{selectedProduct.name}
						</h1>
					</Item.Header>
					<Item.Meta>
						<h3>
							{selectedProduct.category}
						</h3>
					</Item.Meta>
					<Item.Description>
						<h4>
							<span>
								Price
								<span style={{ color: 'green' }}>
									{' '}
									{numeral(selectedProduct.price).format('$ 0,0.00')}
								</span>
							</span>
						</h4>
					</Item.Description>
					<Item.Extra>
						{selectedProduct.desc}
					</Item.Extra>
				</Item.Content>
			</Item>
			<Item>
				<span>
					<Item.Image rounded size="tiny" src={selectedProduct.img} />
					{' '}
					<Item.Image rounded size="tiny" src={selectedProduct.img} />
					{' '}
					<Item.Image rounded size="tiny" src={selectedProduct.img} />
				</span>

			</Item>
		</Item.Group>

	);
};

export default ProductDetails;