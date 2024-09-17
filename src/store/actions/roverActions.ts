import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerCommandRover = createAsyncThunk(
    "rovers/registerCommand",
    async (
        data: { rover: number, plateauSize: string; initialPosition: string; command: string, userId: number },
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
            userId: data.userId
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
        data: { rover: number},
        thunkApi
    ) => {
        try {
        const existingPlateauSize = getLocalStorageItem('plateauSize') ?? ''

        if (!existingPlateauSize) return;

        const response = await axios.get(`/api/direction/${data.rover}?plateauSize=${existingPlateauSize}`);
        
        return response.data.result;
        } catch (error: any) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || "Erro ao buscar direções"
        );
        }
    }
);