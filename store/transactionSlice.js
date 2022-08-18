import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        createTransaction(state, action) {
            const payload = action.payload
            state.transactionId = payload.transactionId
        }
    }
})

export const {createTransaction} = transactionSlice.actions
export default transactionSlice