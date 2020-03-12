import React, { useReducer, createContext, useContext } from 'react';
import * as types from '../global/types';

const initialState = {
    activeItem: 'home',
    cart: [],
    mode: 'catalog',
    openCart: false,
    selectedProduct: '',
    products: []
};

const reducer = (state, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'set-products': {
            const prevState = { ...state };
            prevState.products = action.products;
            return { ...prevState };
        }

        case 'quick-buy': {
            const prevState = { ...state };
            prevState.mode = action.mode;
            prevState.selectedProduct = action.selectedProduct;
            return { ...prevState };
        }

        case 'add-to-cart': {
            const prevState = { ...state };
            prevState.cart.push(action.selectedProduct);
            return { ...prevState };
        }

        case types.OPEN_CART: {
            const prevState = { ...state };
            return { ...prevState, openCart: true };
        }

        case types.CLOSE_CART: {
            const prevState = { ...state };
            return { ...prevState, openCart: false };
        }

        case types.MODE: {
            const prevState = { ...state };
            prevState.mode = action.mode;
            return { ...prevState };
        }

        case types.PAGE: {
            const prevState = { ...state };
            prevState.activeItem = action.activeItem;
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