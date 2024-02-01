import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { signUp, SignUpInput, signIn, SignInOutput, SignUpOutput, SignInInput } from 'aws-amplify/auth';
import { useSelector } from 'react-redux';


interface AuthState {
    loggedIn: boolean
    teacher: boolean
    username: string
    password: string
    name: string
    nickname: string
    isSignUpComplete: boolean
    error: any

}


// Define the initial state using that type
const initialState: AuthState = {
    loggedIn: false,
    teacher: false,
    username: "",
    password: "",
    nickname: "",
    name: "",
    isSignUpComplete: false,
    error: null

}


export const sendSignUp = createAsyncThunk<
    SignUpOutput,
    SignUpInput
>(
    'auth/sendSignUp',
    (signUpInput, thunkAPI) => {

        return signUp(signUpInput)
            .then((response) => {

                return response;
            })
            .catch((error) => {
                console.error('Error signing in:', error);
                throw error;
            });
    }
);

export const sendSignIn = createAsyncThunk<
    SignInOutput,
    SignInInput
>(
    'auth/sendSignIn',
    (signInInput, thunkAPI) => {

        return signIn(signInInput)
            .then((response) => {

                return response;
            })
    }
);



export const AuthSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        clearAuth: (state, action) => {
            state.password = "";
            state.nickname = "";
            state.username = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendSignUp.fulfilled, (state, action) => {
            state.loggedIn = true
            // state.isSignUpComplete = action.payload.isSignedIn

        })
        builder.addCase(sendSignUp.rejected, (state, action) => {
            console.log("rejected")
            state.error = action.error.message

        })
    },

})

export const {
    setUsername,
    setPassword,
    setNickname,
} = AuthSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isLoggedIn = (state: RootState) => state.auth.loggedIn
export const auth = (state: RootState) => state.auth

export const isTeacher = (state: RootState) => state.auth.teacher


export default AuthSlice.reducer