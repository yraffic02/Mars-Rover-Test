import { configureStore } from '@reduxjs/toolkit'
import roverRducer from './features/rover-slice'
import logsReducer from './features/logs-slice'

export function makeStore(){
    return configureStore({
        reducer: {
            rover: roverRducer,
            logs: logsReducer
        }
    })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch