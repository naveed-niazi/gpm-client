import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { downloadExcel, formatDate, waitFunction } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import { matchStatus, searchString } from "../utils/validation";
import { CUSTOMERS_LIST } from "../utils/samples/customers";
import { CUSTOMER_FILTER } from "../utils/constants";

const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (test, thunkAPI) => {
    try {
      const test = await waitFunction();
      const response = CUSTOMERS_LIST;
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const customersSlice = createSlice({
  name: "customers",
  initialState: {
    data: [],
    loading: false,
    error: "",
    filters: CUSTOMER_FILTER,
    filterResult: [],
    selectedRows: [],
  },
  reducers: {
    applyFilter: (state, action) => {
      let customersList = JSON.parse(JSON.stringify(state.data));
      const { view, search } = action.payload;
      customersList = customersList.filter(
        (customer) =>
          matchStatus(view, customer.status) &&
          searchString(customer.first_name + " " + customer.last_name, search)
      );

      state.filterResult = customersList;
      state.filters = action.payload;
    },

    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },

    applyAction: (state, action) => {
      console.log("payload", action.payload);
      const selectedRows = state.selectedRows;
      switch (action.payload) {
        case "Block":
          break;
        case "Activate":
          break;
        case "Export":
          const excelData = selectedRows.map((e) => ({
            "First Name": e.first_name,
            "Last Name": e.last_name,
            Email: e.email,
            Phone: e.phone,
            Country: e.country.name,
            "Last Activity": formatDate(e.last_activity),
            "Total Orders": e.total_orders,
            "Last Order": formatDate(e.last_order),
            "Total Spending": e.total_spending,
            Status: e.status ? "Active" : "Blocked",
          }));
          downloadExcel(excelData, "Customers");
          break;
        default:
          console.log("Unknown Action Type");
      }
      state.selectedRows = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

// this is for dispatch
export const { applyFilter, setSelectedRows, applyAction } =
  customersSlice.actions;
export { fetchCustomers };

// this is for configureStore
export default customersSlice.reducer;
