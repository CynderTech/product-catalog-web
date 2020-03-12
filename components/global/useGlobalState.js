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

    switch (action.type) {
        case 'set-products': {
            const prevState = { ...state };
            prevState.products = action.products;
            return { ...prevState };
        }

        case types.QUICK_BUY: {
            const prevState = { ...state };
            prevState.mode = types.QUICK_BUY;
            const updatedSelectedProduct = {
                ...action.selectedProduct,
                qty: 1
            }

            prevState.selectedProduct = updatedSelectedProduct;
            return { ...prevState };
        }

        case types.CHECK_OUT: {
            const prevState = { ...state };
            prevState.mode = types.CHECK_OUT;
            return { ...prevState };
        }

        case types.ADD_TO_CART: {
            const prevState = { ...state };
            const { selectedProduct } = action;
            const { cart, mode } = prevState;

            if (mode === types.QUICK_BUY) {
                const updatedSelectedProduct = {
                    ...selectedProduct,
                    qty: selectedProduct.qty + 1
                }
                prevState.selectedProduct = updatedSelectedProduct;

                return { ...prevState };
            }

            const index = cart.findIndex(item => item.id === selectedProduct.id);
            const retrievedCartItem = cart[index];

            if (retrievedCartItem) {

                let newQty = retrievedCartItem.qty + 1;

                const cartStart = cart.slice(0, index);
                const cartEnd = cart.slice(index + 1);
                const updateCartItem = {
                    ...retrievedCartItem,
                    qty: newQty
                };

                const updatedCart = [
                    ...cartStart,
                    updateCartItem,
                    ...cartEnd
                ];

                prevState.cart = updatedCart;

            } else {
                const updatedSelectedProduct = {
                    ...selectedProduct,
                    qty: 1
                }
                prevState.cart.push(updatedSelectedProduct);
            }
            return { ...prevState };
        }

        case types.REMOVE_FROM_CART: {
            const prevState = { ...state };
            const { selectedProduct } = action;
            const { cart, mode } = prevState;

            if (mode === types.QUICK_BUY) {
                let updatedSelectedProduct = {};

                if (selectedProduct.qty === 1) {
                    prevState.selectedProduct = '';
                } else {
                    updatedSelectedProduct = {
                        ...selectedProduct,
                        qty: selectedProduct.qty - 1
                    }
                    prevState.selectedProduct = updatedSelectedProduct
                }

                prevState.selectedProduct = updatedSelectedProduct;

                return { ...prevState };
            }

            const index = cart.findIndex(item => item.id === selectedProduct.id);
            const retrievedCartItem = cart[index];
            let newQty = retrievedCartItem.qty - 1;
            let updatedCart = [];
            const cartStart = cart.slice(0, index);
            const cartEnd = cart.slice(index + 1);

            if (retrievedCartItem.qty === 1) {

                updatedCart = [
                    ...cartStart,
                    ...cartEnd
                ];

                prevState.cart = updatedCart;

            } else {
                const updateCartItem = {
                    ...retrievedCartItem,
                    qty: newQty
                };

                updatedCart = [
                    ...cartStart,
                    updateCartItem,
                    ...cartEnd
                ];

                prevState.cart = updatedCart;
            }
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