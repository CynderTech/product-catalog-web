import React from 'react';
import {
	Card, Icon, Image, Grid
} from 'semantic-ui-react';
import numeral from 'numeral';

const ListItem = ({ data }) => {
	const {
		file, name, price, qty
	} = data;

	return (

		<Card fluid>
			<Card.Content>
				<Grid columns={2}>
					<Grid.Column>
						<Image
							bordered
							floated="left"
							size="tiny"
							src={`${process.env.CMS_BASE_URL}${((file || {}).publicUrl || '')}`}
						/>
						<Card.Header>{name}</Card.Header>
						<Card.Meta>category</Card.Meta>
					</Grid.Column>
					<Grid.Column>
						<Card.Content extra textAlign="right">
							<span style={{ color: 'green' }}>{numeral(price || 0).format('$ 0,0.00')}</span>
						</Card.Content>
						<Card.Content as="a" extra textAlign="right">
							<div>
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