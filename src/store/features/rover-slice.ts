import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const registerCommandRover = createAsyncThunk(
  "rovers/registerCommand",
  async (
    data: { rover: number, plateauSize: string; initialPosition: string; command: string },
    thunkApi
  ) => {
    try {
      const existingPlateauSize = getLocalStorageItem('plateauSize')
      const existingRover = getLocalStorageItem(`Rover-${data.rover}`);

      if(!existingPlateauSize){
        setLocalStorageItem('plateauSize', data.plateauSize)
      }
  
      if(!existingRover){
        setLocalStorageItem(`Rover-${data.rover}`, { rover: data.rover, position: data.initialPosition})
      }
      
      const response = await axios.post("/api/direction", {
        rover: data.rover,
        plateauSize: existingPlateauSize ? existingPlateauSize : data.plateauSize,
        initialPosition: data.initialPosition,
        command: data.command,
      });
      
      const { result }= response.data

      return {
        route: result,
        status: response.status
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Erro ao registrar comando"
      );
    }
  }
);

export const getDirectionByRove = createAsyncThunk(
  "rovers/getDirectionByRove",
  async (
    data: { rover: number, plateauSize: string},
    thunkApi
  ) => {
    try {
      const response = await axios.get(`/api/direction/${data.rover}?plateauSize=${data.plateauSize}`);
      
      return response.data.result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Erro ao buscar direções"
      );
    }
  }
);

interface RoverState {
  result:{
    route: {
      rover: number |null
      coordinates: {
        x: number | null,
        y: number | null
      },
      direction: string
    },
    status: number | null
  };
  direction: {
    positions: [],
    rover: string
  },
  loading: boolean;
  error: string | null;
}

const initialState: RoverState = {
  result: {
    route: {
      rover: null,
      coordinates: {
        x: null,
        y: null
      },
      direction: ''
    },
    status: null
  },
  direction: {
    positions: [],
    rover: ''
  },
  loading: false,
  error: null,
};

const roverSlice = createSlice({
  name: "rover",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerCommandRover.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCommandRover.fulfilled, (state, action: PayloadAction<any>) => {
        state.result = action.payload;
        state.loading = false;
      })
      .addCase(registerCommandRover.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false; 
      })
      
      .addCase(getDirectionByRove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDirectionByRove.fulfilled, (state, action: PayloadAction<any>) => {
        state.direction = action.payload;
        state.loading = false;
      })
      .addCase(getDirectionByRove.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false; 
      });
  },
});

export default roverSlice.reducer;
