import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TextLog from "../dashboard/ImportWebsites/Logs/TextLog";
import ResultLog from "../dashboard/ImportWebsites/Logs/ResultLog";
import ErrorLog from "../dashboard/ImportWebsites/Logs/ErrorLog";
import { v4 as uuidv4 } from "uuid";
import { waitFunction } from "../utils/helper";
import ActionLog from "../dashboard/ImportWebsites/Logs/ActionLog";

const upload = createAsyncThunk(
  "importWebsites/upload",
  async (test, thunkAPI) => {
    try {
      const test = await waitFunction();

      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const importSlice = createSlice({
  name: "import",
  initialState: {
    file: undefined,
    logs: [],
    result: { old: [], new: [] },
    loading: false,
    error: "",
  },
  reducers: {
    addTextLog: (state, action) => {
      let comp = <TextLog key={uuidv4()} text={action.payload} />;
      state.logs.push(comp);
    },
    addErrorLog: (state, action) => {
      let comp = <ErrorLog key={uuidv4()} error={action.payload} />;
      state.logs.push(comp);
    },
    addResultLog: (state, action) => {
      let comp = <ResultLog key={uuidv4()} />;
      state.logs.push(comp);
    },
    addActionLog: (state, action) => {
      let comp = <ActionLog key={uuidv4()} />;
      state.logs.push(comp);
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    resetImportData: (state, action) => {
      state.file = undefined;
      state.logs = [];
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(upload.pending, (state, action) => {
      state.loading = true;
      state.logs.pop();
    });
    builder.addCase(upload.fulfilled, (state, action) => {
      state.loading = false;
      let comp = <TextLog key={uuidv4()} text="File Imported Successfully!" />;
      state.logs.push(comp);
    });
    builder.addCase(upload.rejected, (state, action) => {
      state.loading = false;
      console.log("rejected", action.payload);
      let comp = <ErrorLog key={uuidv4()} error={action.payload} />;
      let comp2 = <ErrorLog key={uuidv4()} error="Please try again later!" />;
      state.logs.push(comp);
      state.logs.push(comp2);
    });
  },
});

// this is for dispatch
export const {
  addErrorLog,
  addTextLog,
  addActionLog,
  addResultLog,
  setFile,
  setResult,
  resetImportData,
} = importSlice.actions;
export { upload };

// this is for configureStore
export default importSlice.reducer;
