import * as types from '../global/types';

export const syncSelector = (action, checkedOutItems, cart) => {
    const { selectedProduct, type } = action;
    const cartIndex = cart.findIndex(item => item.id === selectedProduct.id);
    const retrievedCartItem = cart[cartIndex];
    const checkedOutItemsIndex = checkedOutItems.findIndex(item => item.id === retrievedCartItem.id);
    let updatedCheckedOutItems = [];
    if (index2 !== -1) {
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
}

export const modifyCartData = (cart, action) => {
    const { type, selectedProduct } = action;
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

            cart = updatedCart;

        } else {

            const updatedSelectedProduct = {
                ...selectedProduct,
                checked: true,
                qty: 1
            }

            cart.push(updatedSelectedProduct);

            return cart;
        }
    }

    if (type === types.REMOVE_FROM_CART) {
        if (retrievedCartItem.qty === 1) {
            console.log('action Type', action.type);
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

    if (type === types.CHECKED_PRODUCT) {
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

    return updatedCart;

    // if (mode === types.QUICK_BUY) {
    //     let updatedSelectedProduct = {};

    //     if (selectedProduct.qty === 1) {
    //         prevState.selectedProduct = '';
    //     } else {
    //         updatedSelectedProduct = {
    //             ...selectedProduct,
    //             qty: selectedProduct.qty - 1
    //         }
    //         prevState.selectedProduct = updatedSelectedProduct
    //     }

    //     prevState.selectedProduct = updatedSelectedProduct;

    //     return { ...prevState };
    // }
}

export const checkOut = (cart) => {
    console.log('carrttt', cart);
    return cart.filter(cartItem => cartItem.checked === true);
}


const selectedProduct = { id: 1, name: 'Biscuits' };

