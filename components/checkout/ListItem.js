import React from 'react';
import {
	Card, Button, Icon, Image, Grid, Segment, Label
} from 'semantic-ui-react';
import numeral from 'numeral';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';

const ListItem = ({ data }) => {
	const {
		desc, img, name, price, qty
	} = data;
	const [{ cart, mode, selectedProduct }, dispatch] = useGlobalState();

	return (

		<Card fluid>
			<Card.Content>
				{/* <Label as="a" circular centered outline floating size="large">X</Label>
*/}
				<Grid columns={2}>
					<Grid.Column>
						<Image
							bordered
							floated="left"
							size="tiny"
							src={img}
						/>
						<Card.Header>{name}</Card.Header>
						<Card.Meta>category</Card.Meta>
						{/* <Card.Description
							style={{
								width: '300px',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis'
							}}>
							{desc}
						</Card.Description> */}
					</Grid.Column>
					<Grid.Column>
						<Card.Content extra textAlign="right">
							<span style={{ color: 'green' }}>{numeral(price || 0).format('$ 0,0.00')}</span>
						</Card.Content>
						<Card.Content as="a" extra textAlign="right">
							<div>
								{/* <Button.Group basic size='mini'>
                                    <Button onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: data })}>+</Button>
                                    <Button onClick={() => dispatch({ type: types.REMOVE_FROM_CART, selectedProduct: data })}>-</Button>
                                </Button.Group> */}

								{' '}
								<Icon />
								<span>{qty ? `x${qty}` : `x${1}`}</span>
							</div>
						</Card.Content>
					</Grid.Column>
				</Grid>
			</Card.Content>
			<Card.Content as="a" extra textAlign="right">
				<div>
					Sub-Total:
					<span>{` ${numeral(qty ? qty * price : 0 || 0).format('$ 0,0.00')}`}</span>
				</div>
			</Card.Content>
		</Card>
	);
};


export default ListItem;