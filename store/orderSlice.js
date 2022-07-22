import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder(state, action) {
      const payload = action.payload;
      state.client_name = payload.client_name;
      state.client_phone = payload.client_phone;
      state.collection_date = payload.collection_date;
      state.collection_time = payload.collection_time;
      state.order_total = payload.order_total;
      state.delivery = payload.delivery;
      state.order_item = payload.order_item.create[0];
      state.order_item_add_ons = payload.order_item_add_ons.create;
    },
  },
});

export const { createOrder } = orderSlice.actions;
export default orderSlice;
