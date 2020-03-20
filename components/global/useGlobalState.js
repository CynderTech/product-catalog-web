import React, { useReducer, createContext, useContext } from 'react';
import * as types from './types';
import { modifyCartData, checkOut } from '../product/catalogLibrary';


const initialState = {
	activeItem: 'home',
	cart: [],
	mode: types.CATALOG,
	openCart: false,
	selectedProduct: '',
	products: [],
	paymentDetails: {}
};

const reducer = (state, action) => {

	switch (action.type) {
		case 'set-products': {
			const prevState = { ...state };
			prevState.products = action.products;
			return { ...prevState };
		}

		case types.VIEW_PRODUCT: {
			const prevState = { ...state };
			prevState.mode = types.VIEW_PRODUCT;
			prevState.selectedProduct = action.selectedProduct;
			return { ...prevState };
		}

		case types.QUICK_BUY: {
			const prevState = { ...state };
			prevState.mode = types.QUICK_BUY;
			prevState.selectedProduct = {
				...action.selectedProduct,
				qty: 1
			};

			return { ...prevState };
		}

		case types.CHECK_OUT: {
			const prevState = { ...state };
			prevState.mode = types.CHECK_OUT;
			prevState.cart = checkOut(prevState.cart);
			return { ...prevState, openCart: false };
		}

		case types.SELECT_PRODUCT:
		case types.ADD_TO_CART:
		case types.REDUCE_FROM_CART:
		case types.REMOVE_FROM_CART:
		case types.CLEAR_CART: {
			const prevState = { ...state };
			prevState.cart = modifyCartData(prevState.cart, action);
			return { ...prevState };
		}

		case types.EDIT_CART: {
			const prevState = { ...state };
			prevState.editCart = true;
			return { ...prevState };
		}

		case types.CLOSE_CART: {
			const prevState = { ...state };
			prevState.openCart = false;
			return { ...prevState };
		}

		case types.OPEN_CART: {
			const prevState = { ...state };
			return { ...prevState, openCart: true };
		}

		case types.EDIT_ITEM: {
			const prevState = { ...state };
			return { ...prevState, openCart: false };
		}

		case types.MODE: {
			const prevState = { ...state };
			prevState.editCart = action.type;
			return { ...prevState };
		}

		case types.CATALOG: {
			const prevState = { ...state };
			prevState.mode = action.type;
			return { ...prevState };
		}

		case types.PAYMENT_SUCCESS: {
			const prevState = { ...state };
			prevState.mode = action.type;
			return { ...prevState };
		}

		case types.PAYMENT_ERROR: {
			const prevState = { ...state };
			prevState.mode = action.type;
			return { ...prevState };
		}

		case types.PAYMENT_DETAILS: {
			const prevState = { ...state };
			const key = Object.keys(action)[1];
			prevState.paymentDetails = {
				...prevState.paymentDetails,
				[Object.keys(action)[1]]: action[key]
			};
			return { ...prevState };
		}

		default: {
			throw new Error('Invalid Action Type');
		}
	}
};

const StateContext = createContext(null);

export const ProductCatalogProvider = ({ children }) => <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>;

export const useGlobalState = () => useContext(StateContext);

export default { ProductCatalogProvider, useGlobalState };