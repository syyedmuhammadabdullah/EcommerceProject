import {createSlice} from "@reduxjs/toolkit";
import getBalance from "./getBalance.js";
import getTransactions from "./getTransaction.js";
import requestWithdraw from "./requestWithdraw.js";
import getPendingWithdrawRequest from "./getPendingWithdrawRequest.js";
import updateWithdrawRequest from "./updateWithdrawRequest.js";
const initialState = {
    walletBalance: 0,
    transactions: [],
    pendingTransactions: [],
    loading: false,
    error: null,
};
const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
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
                state.transactions.withdrawn.push(action.payload);
                state.walletBalance -= action.payload.amount;
            })
            .addCase(requestWithdraw.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getPendingWithdrawRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPendingWithdrawRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingTransactions = action.payload;
            })
            .addCase(getPendingWithdrawRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateWithdrawRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateWithdrawRequest.fulfilled, (state, action) => {
                state.loading = false;                
                state.pendingTransactions = state.pendingTransactions.filter(
                    (transaction) => transaction.id !== action.payload.id
                );
            })
            .addCase(updateWithdrawRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export default transactionSlice.reducer;