import {createSlice} from "@reduxjs/toolkit";
import getBalance from "./getBalance.js";
import getTransactions from "./getTransaction.js";
import requestWithdraw from "./requestWithdraw.js";

const initialState = {
    walletBalance: 0,
    transactions: {},
    loading: false,
    error: null,
};
const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        updateTransactionStatus: (state, action) => {
            const { transactionId, status } = action.payload;
            const transactionIndex = state?.transactions?.withdrawn?.findIndex(t => t._id === transactionId);
            if (transactionIndex !== -1) {
                state.transactions.withdrawn[transactionIndex].status = status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.loading = false;    
                state.walletBalance = action.payload;
            })
            .addCase(getBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(requestWithdraw.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestWithdraw.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.withdrawn = [action.payload, ...state.transactions.withdrawn];
            })
            .addCase(requestWithdraw.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const { updateTransactionStatus } = transactionSlice.actions;
export default transactionSlice.reducer;