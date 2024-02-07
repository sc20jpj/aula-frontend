import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';

import { 
    signUp, 
    SignUpInput, 
    signIn, 
    SignInOutput, 
    SignUpOutput, 
    SignInInput,
    signOut,
    fetchUserAttributes,
    FetchUserAttributesOutput,
    autoSignIn,
    confirmSignUp,
    ConfirmSignUpOutput,
    ConfirmSignUpInput,
    resendSignUpCode,
    ResendSignUpCodeOutput,
    ResendSignUpCodeInput
} from 'aws-amplify/auth';

import { useSelector } from 'react-redux';
import { fetchAuthSession } from 'aws-amplify/auth';

interface AuthState {
    loggedIn: boolean;
    teacher: boolean;
    email?: string;
    checkEmail?: string;
    password?: string;
    name?: string;
    nickname?: string;
    isSignUpSent: boolean;
    isSignUpComplete: boolean;
    loading: boolean;
    code?: string;
}

const initialState: AuthState = {
    loggedIn: false,
    teacher: false,
    checkEmail: "",
    email: "",
    password: "",
    nickname: "",
    name: "",    
    isSignUpSent: false,
    isSignUpComplete: false,
    loading: false,
    code: ""
}


export const sendSignUp = createAsyncThunk<
    SignUpOutput,
    SignUpInput
>(
    'auth/sendSignUp',
    (signUpInput, thunkAPI) => {
        


        // if (signUpInput.password  ) (

        // )
        return signUp(signUpInput)
            .then((response) => {

                return thunkAPI.fulfillWithValue(response);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue("Error with signing up , please enter an email and a strong password");
            });
    }
);

export const sendAutoSignIn = createAsyncThunk(
    'auth/autoSignIn',
    (sendAutoSignInInput,thunkAPI) => {

        return autoSignIn()
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);

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
                return thunkAPI.fulfillWithValue(response);;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue("Email or password is incorrect");
            });
    }
);

export const sendSignOut = createAsyncThunk(
    'auth/sendSignOut',
    (_,thunkAPI) => {

        return signOut()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);

            });
    }
);

export const getUserAttributes = createAsyncThunk<
FetchUserAttributesOutput
>(
    
    'auth/getUserAttributes',
    (_,thunkAPI) => {
        console.log()
        return fetchUserAttributes()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
    }
);
export const resendVerificationCode = createAsyncThunk<
ResendSignUpCodeOutput,
ResendSignUpCodeInput
>(
    'auth/resendVerificationCode',
    (verifcationResendInput,thunkAPI) => {
        return resendSignUpCode(verifcationResendInput)
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
    }
);

export const checkVerificatonCode = createAsyncThunk<
ConfirmSignUpOutput,
ConfirmSignUpInput
>(
    'auth/checkVerificationCode',
    (verificationInput,thunkAPI) => {
        return confirmSignUp(verificationInput)
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
    }
);


export const getCurrentSession = createAsyncThunk(
    'auth/getCurrentSession',
    (signInInput, thunkAPI) => {

        return fetchAuthSession()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
    }
);



export const AuthSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setCheckEmail: (state, action) => {
            state.checkEmail = action.payload;
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
        setCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },

        clearAuth: (state) => {
            state.password = "";
            state.nickname = "";
            state.email = "";
            state.name = ""
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendSignUp.fulfilled, (state, action) => {
            state.isSignUpSent= true
            state.checkEmail = state.email
        })
        builder.addCase(sendSignOut.fulfilled, (state, action) => {
            state.loggedIn = false
        })
        builder.addCase(sendSignUp.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(checkVerificatonCode.fulfilled, (state, action) => {
            state.isSignUpComplete = true
        })
        builder.addCase(sendAutoSignIn.fulfilled, (state, action) => {
            state.loggedIn = true
        })
        builder.addCase(getUserAttributes.fulfilled, (state, action) => {
            state.name = action.payload.name
            state.nickname = action.payload.nickname
            state.email = action.payload.email

            
        })
    },

})

export const {
    setEmail,
    setPassword,
    setNickname,
    clearAuth,
    setName,
    setCode,

} = AuthSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isLoggedIn = (state: RootState) => state.auth.loggedIn
export const auth = (state: RootState) => state.auth

export const isTeacher = (state: RootState) => state.auth.teacher


export default AuthSlice.reducer