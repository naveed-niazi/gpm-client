import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitFunction } from "../utils/helper";
import { ORDER_DETAIL } from "../utils/samples/orders";

const fetchOrder = createAsyncThunk(
  "orderView/fetchOrder",
  async (payload, thunkAPI) => {
    try {
      const test = await waitFunction();
      const response = ORDER_DETAIL;
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const orderViewSlice = createSlice({
  name: "orderView",
  initialState: {
    data: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

// this is for dispatch
export const { setSearch } = orderViewSlice.actions;
export { fetchOrder };

// this is for configureStore
export default orderViewSlice.reducer;
