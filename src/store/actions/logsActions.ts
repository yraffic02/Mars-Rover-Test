import { createAsyncThunk } from "@reduxjs/toolkit";
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