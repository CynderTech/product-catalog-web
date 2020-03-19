import React, { useState } from 'react';
import {
	Button, Icon, Header, Input, Label, Item, Checkbox, Divider
} from 'semantic-ui-react';
import numeral from 'numeral';
import * as types from '../global/types';
import { useGlobalState } from '../global/useGlobalState';

const CartItem = data => {
	const [hovered, setHovered] = useState(false);
	const [, dispatch] = useGlobalState();

	return (
		<Item on="hover" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ marginRight: '0px' }}>
			<Item.Content>
				<Checkbox
					defaultChecked
					floated="left"
					onChange={(e, props) => dispatch({ type: types.SELECT_PRODUCT, selectedProduct: { ...data, checked: props.checked } })}
				/>
			</Item.Content>
			<Item.Content>
				<Item.Image floated="left" rounded size="tiny" src={data.img} />
			</Item.Content>
			<Item.Content>
				<Header
					as="h5"
					floated="left"
					style={{
						width: '150px',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis'
					}}>
					{data.name}
				</Header>

				<Label
					as="a"
					basic
					floated="right"
					onClick={() => dispatch({ type: types.REMOVE_FROM_CART, selectedProduct: data })}
					size="large"
					style={{
						position: 'relative',
						bottom: '12px',
						color: hovered ? 'black' : 'white',
						borderStyle: 'none',
						width: '3px',
						height: '3px'
					}}>
					<Icon name="close" />
				</Label>

				<Item.Meta floated="left">
					<span style={{ color: 'green' }}>{numeral(data.price || 0).format('$ 0,0.00')}</span>
					<Input>
						<Button.Group basic floated="left" size="mini">
							<Button icon="minus" onClick={() => dispatch({ type: types.REDUCE_FROM_CART, selectedProduct: data })} />
							<input
								onChange={e => console.log(e.target.value)}
								style={{
									width: '50px',
									textAlign: 'center',
									fontSize: '10px',
									borderStyle: 'groove',
								}}
								value={data.qty}
							/>
							<Button icon="add" onClick={() => dispatch({ type: types.ADD_TO_CART, selectedProduct: data })} />
						</Button.Group>
					</Input>
				</Item.Meta>
			</Item.Content>
			<Item.Content />
		</Item>
	);
};

export default CartItem;