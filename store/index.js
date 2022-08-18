import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import transactionSlice from "./transactionSlice";

const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
    transaction: transactionSlice.reducer
  },
});

export default store;
