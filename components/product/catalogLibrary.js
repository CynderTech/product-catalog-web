import * as types from '../global/types';

export const syncSelector = (action, checkedOutItems, cart) => {
	const { selectedProduct, type } = action;
	const cartIndex = cart.findIndex(item => item.id === selectedProduct.id);
	const retrievedCartItem = cart[cartIndex];
	const checkedOutItemsIndex = checkedOutItems.findIndex(item => item.id === retrievedCartItem.id);
	let updatedCheckedOutItems = [];

	if (checkedOutItemsIndex !== -1) {
		const checkedOutItemsStart = cart.slice(0, checkedOutItemsIndex);
		const retrivedCheckedOutItem = checkedOutItems[checkedOutItemsIndex];
		const checkedOutItemsEnd = cart.slice(checkedOutItemsIndex + 1);

		if (type === types.ADD_TO_CART) {
			updatedCheckedOutItems = {
				...checkedOutItemsStart,
				retrievedCartItem,
				...checkedOutItemsEnd
			};
		}

		if (type === types.REMOVE_FROM_CART) {
			if (retrievedCartItem.qty === 1) {
				updatedCheckedOutItems = {
					...checkedOutItemsStart,
					...checkedOutItemsEnd
				};
			} else {
				updatedCheckedOutItems = {
					...checkedOutItemsStart,
					retrievedCartItem,
					...checkedOutItemsEnd
				};
			}
		}

		return updatedCheckedOutItems;
	}
};

export const modifyCartData = (cart, action) => {
	const { selectedProduct, type } = action;
	let updatedCart = [];
	let newQty = 0;
	let updatedCartItem = {};
	const index = cart.findIndex(item => item.id === selectedProduct.id);
	const retrievedCartItem = cart[index];
	const cartStart = cart.slice(0, index);
	const cartEnd = cart.slice(index + 1);

	if (type === types.ADD_TO_CART) {
		if (retrievedCartItem) {
			newQty = retrievedCartItem.qty + 1;

			updatedCartItem = {
				...retrievedCartItem,
				qty: newQty
			};

			updatedCart = [
				...cartStart,
				updatedCartItem,
				...cartEnd
			];
		} else {
			const updatedSelectedProduct = {
				...selectedProduct,
				checked: true,
				qty: 1
			};

			cart.push(updatedSelectedProduct);

			return cart;
		}
	}

	if (type === types.REMOVE_FROM_CART) {
		if (retrievedCartItem.qty === 1) {

			updatedCart = [
				...cartStart,
				...cartEnd
			];
		} else {
			newQty = retrievedCartItem.qty - 1;

			updatedCartItem = {
				...retrievedCartItem,
				qty: newQty
			};

			updatedCart = [
				...cartStart,
				updatedCartItem,
				...cartEnd
			];
		}
	}

	if (type === types.SELECT_PRODUCT) {
		updatedCartItem = {
			...retrievedCartItem,
			checked: selectedProduct.checked
		};

		updatedCart = [
			...cartStart,
			updatedCartItem,
			...cartEnd
		];
	}

	if (type === types.QUICK_BUY) {
		const updatedSelectedProduct = {
			...selectedProduct,
			checked: true,
			qty: 1
		};

		const unselectedProducts = deSelectAllCartItems(cart);

		updatedCart = [
			updatedSelectedProduct,
			...unselectedProducts
		];
	}

	return updatedCart;
};

export const checkOut = (cart, value) => cart.filter(cartItem => {
	if (cartItem.checked) {
		cartItem.status = 'checked-out';
		return cartItem;
	}
});

export const selectAllCartItems = cart => cart.map(item => {
	item.checked = true;
	return item;
});

export const deSelectAllCartItems = cart => cart.map(item => {
	item.checked = false;
	return item;
});
