import React, { useReducer, createContext, useContext } from 'react';
import * as types from '../global/types';

const initialState = {
    bills: [
        {
            _id: 1,
            invoice_date: '11-11-19',
            due_date: '12-12-19',
            amount: '100',
        },
        {
            _id: 2,
            invoice_date: '11-11-20',
            due_date: '12-12-20',
            amount: '200',
        }],
    invoices: [],
    mode: 'catalog'
};

const reducer = (state, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'set-bills': {
            const prevState = { ...state };
            prevState.bills = action.bills;
            return { ...prevState };
        }

        case 'set-invoices': {
            const prevState = { ...state };
            prevState.invoices = action.invoices;
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