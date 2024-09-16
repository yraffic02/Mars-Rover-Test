import { UserState } from "@/configs/interfaces-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser } from "../actions/userActions";
import { getLocalStorageItem } from "@/utils/localStorage";

const initialState: UserState = {
    user: {
      id: 0,
      username: ''
    },
    loading: false,
    error: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action :PayloadAction){
      const user = getLocalStorageItem('user')

      if(user){
        state.user = user
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = '';
    })
    .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.loading = false;
    })
    .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false; 
    })
  },
});

export const {
  getUser
} = userSlice.actions;

export default userSlice.reducer;