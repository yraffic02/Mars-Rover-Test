import { Logs } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getLogs = createAsyncThunk(
  "logs/getLogs",
  async (plateauSize: string, thunkApi) => {
    try {
        const response = await axios.post('/api/logs', {plateauSize});

        return response.data.result   
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        "Erro ao buscar logs"
      );
    }
  }
);

interface LogsStates {
  data: Logs[];
  loading: boolean;
  error: string | null;
}

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
