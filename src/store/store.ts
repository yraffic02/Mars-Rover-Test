import { configureStore } from '@reduxjs/toolkit'
import roverRducer from './slices/roverSlice'
import logsReducer from './slices/logsSlice'
import cartesianReducer from './slices/cartesianSlice'
import userReducer from  './slices/userSlice'

export function makeStore(){
    return configureStore({
        reducer: {
            rover: roverRducer,
            logs: logsReducer,
            cartesian: cartesianReducer,
            user: userReducer
        }
    })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch