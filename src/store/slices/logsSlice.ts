import { LogsStates } from "@/configs/interfaces-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLogs } from "../actions/logsActions";

const initialState: LogsStates = {
    data: [],
  loading: false,
  error: null,
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = [...action.payload];
        state.loading = false;
      })
      .addCase(getLogs.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false; 
      });
  },
});

export default logsSlice.reducer;