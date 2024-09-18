import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLogs = createAsyncThunk(
    "logs/getLogs",
    async (data:{ plateauSize: string, userId: number}, thunkApi) => {
      try {
          const response = await axios.post('/api/logs', {plateauSize: data.plateauSize, userId: data.userId});
  
          return response.data.result   
      } catch (error: any) {
        return thunkApi.rejectWithValue(
          "Erro ao buscar logs"
        );
      }
    }
  );