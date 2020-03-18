import React from 'react';
import {
	Container, Breadcrumb, Button, Divider, Icon, Grid, Header, Image, Segment
} from 'semantic-ui-react';
import { useGlobalState } from './global/useGlobalState';

const ThankYouPage = () => {
	const [{ mode }, dispatch] = useGlobalState();

	return (
		<div>
			<Segment placeholder>

			</Segment>
		</div>
	);
};

export default ThankYouPage;