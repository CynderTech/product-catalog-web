import React, { useReducer, createContext, useContext } from 'react';
import * as types from '../global/types';

const initialState = {
    mode: 'catalog'
};

const reducer = (state, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'set-products': {
            const prevState = { ...state };
            prevState.bills = action.bills;
            return { ...prevState };
        }

        case types.MODE: {
            const prevState = { ...state };
            prevState.mode = action.mode;
            return { ...prevState };
        }

        default: {
            throw new Error('Invalid Action Type');
        }
    }
};

const StateContext = createContext(null);

export const PrometheusProvider = ({ children }) => <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>;

export const useGlobalState = () => useContext(StateContext);

export default { PrometheusProvider, useGlobalState };