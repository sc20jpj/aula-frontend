import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';


import { useSelector } from 'react-redux';
import { API } from '@lib/APi';

interface UserState {
    user?: UserResponse
    module_id: string
}

const initialState: UserState = {
    user: undefined,
    module_id: ""
}



export const checkUser = createAsyncThunk<
    UserResponse
>(
    'User/resendVerificationCode',
    (_, thunkAPI) => {
        return API.getUser()
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
    }
);



export const UserSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(checkUser.fulfilled, (state, action) => {
            state.user = action.payload
        })

    },

})

export const {


} = UserSlice.actions

export const user = (state: RootState) => state.user.user

export default UserSlice.reducer