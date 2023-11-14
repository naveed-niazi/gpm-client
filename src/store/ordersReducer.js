import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitFunction } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import {
  matchOrderStatus,
  matchStatus,
  searchString,
} from "../utils/validation";
import { ORDERS_LIST } from "../utils/samples/orders";
import { ORDER_FILTER } from "../utils/constants";

const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (test, thunkAPI) => {
    try {
      const test = await waitFunction();
      const response = ORDERS_LIST;
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    loading: false,
    error: "",
    filters: ORDER_FILTER,
    filterResult: [],
  },
  reducers: {
    applyFilter: (state, action) => {
      let ordersList = JSON.parse(JSON.stringify(state.data));
      const { view, search } = action.payload;
      ordersList = ordersList.filter(
        (order) =>
          matchOrderStatus(view, order.status) && searchString(order.id, search)
      );

      state.filterResult = ordersList;
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

// this is for dispatch
export const { applyFilter } = ordersSlice.actions;
export { fetchOrders };

// this is for configureStore
export default ordersSlice.reducer;
