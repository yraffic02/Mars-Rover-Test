import { RoverState } from "@/configs/interfaces-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDirectionByRove, registerCommandRover } from "../actions/roverActions";

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
  