import { setLocalStorageItem } from "@/utils/localStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk(
    "user/createUser",
    async (
        data: { username: string },
        thunkApi
    ) => {
        try {    
            const response = await axios.post("/api/user", { username: data.username });
            
            const { user } = response.data

            setLocalStorageItem('user', user)

            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Erro ao registrar comando"
            );
        }
    }
);