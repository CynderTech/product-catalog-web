import React, { useReducer, createContext, useContext } from 'react';
import * as types from '../global/types';

const initialState = {
    activeItem: 'home',
    cart: [],
    mode: types.CATALOG,
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

        case types.QUICK_BUY: {
            const prevState = { ...state };
            prevState.mode = types.QUICK_BUY;
            prevState.selectedProduct = action.selectedProduct;
            return { ...prevState };
        }

        case types.CHECK_OUT: {
            const prevState = { ...state };
            prevState.mode = types.CHECK_OUT;
            return { ...prevState };
        }

        case types.ADD_TO_CART: {
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


        case types.CATALOG: {
            const prevState = { ...state };
            prevState.activeItem = 'home';
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