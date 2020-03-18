import React from 'react';
import {
	Container, Breadcrumb, Button, Divider, Icon, Grid, Header, Image, Segment
} from 'semantic-ui-react';
import * as types from './global/types';
import { useGlobalState } from './global/useGlobalState';

const ThankYouPage = () => {
	const [{ mode }, dispatch] = useGlobalState();

	return (

		<div style={{
			height: '500px',
			width: '100%'
		}}>
			<Segment placeholder style={{ paddingTop: '200px' }} vertical>
				{mode === types.PAYMENT_SUCCESS
					&& (
						<Header icon>
							<Icon color="green" name="check" />
							Thank you for your purchase!
						</Header>
					)}
				{mode === types.PAYMENT_ERROR
					&& (
						<Header icon>
							<Icon color="red" name="close" />
							Something went wrong!
						</Header>
					)}

				<Button onClick={() => dispatch({ type: types.CATALOG })} primary>Back to Main Page</Button>
			</Segment>
		</div>

	);
};

export default ThankYouPage;