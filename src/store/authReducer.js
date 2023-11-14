import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchLogin = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authInfo: {},
    loading: false,
    error: "",
  },
  reducers: {
    addAuth: (state, action) => {
      state.authInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.authInfo = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

// this is for dispatch
export const { addAuth } = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
