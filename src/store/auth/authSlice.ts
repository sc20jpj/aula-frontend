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
    ResendSignUpCodeInput,
    fetchAuthSession,
    AuthTokens,
} from 'aws-amplify/auth';
import { useSelector } from 'react-redux';

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
    idToken?: string;
    accessToken?: string;
    cognito_username?: string
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
    code: "",
    idToken: undefined,
    accessToken: undefined,
    // only to be used for dev purposes
    cognito_username: ""
}


export const sendSignUp = createAsyncThunk<
    SignUpOutput,
    SignUpInput
>(
    'auth/sendSignUp',
    (signUpInput, thunkAPI) => {

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
    (sendAutoSignInInput, thunkAPI) => {

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
    async (signInInput, thunkAPI) => {
        await thunkAPI.dispatch(sendSignOut)

        return signIn(signInInput)
            .then(async (response) => {


                return thunkAPI.fulfillWithValue(response);

            })
            .catch((error) => {
                console.log(error)
                return thunkAPI.rejectWithValue("Email or password is incorrect");
            });
    }
);

export const sendSignOut = createAsyncThunk<
    void
>(
    'auth/sendSignOut',
    (_, thunkAPI) => {

        return signOut()
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);
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
    (_, thunkAPI) => {
        console.log()
        return fetchUserAttributes()
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);
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
    (verifcationResendInput, thunkAPI) => {
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
    (verificationInput, thunkAPI) => {
        return confirmSignUp(verificationInput)
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
    }
);


export const getCurrentSession = createAsyncThunk<
    AuthTokens | undefined
>(
    'auth/getCurrentSession',
    (_, thunkAPI) => {

        return fetchAuthSession()
            .then((response) => {
                return thunkAPI.fulfillWithValue(response.tokens);
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
            state.teacher = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendSignUp.fulfilled, (state, action) => {
            state.isSignUpSent = true
            state.checkEmail = state.email
            state.cognito_username = action.payload.userId
        })
        builder.addCase(sendSignOut.fulfilled, (state, action) => {
            state.loggedIn = false
            state.accessToken = ""
            state.idToken = ""
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
        builder.addCase(sendSignIn.fulfilled, (state, action) => {
            state.loggedIn = true
        })
        builder.addCase(getCurrentSession.fulfilled, (state, action) => {
            if (action.payload) {
                state.idToken = action.payload.idToken?.toString()
                const accessTokenString = action.payload?.accessToken?.toString()

                // this code isnt great its basically tricking the typescript compiler
                // cognito lack of supprt for typescript necesitates this
                if (typeof action.payload.accessToken.payload === 'object') {
                    const groups = action.payload.accessToken.payload["cognito:groups"];
                    if (Array.isArray(groups) && groups.includes("teachers")) {
                        state.teacher = true;
                        console.log("is teacher")
                    } else {
                        console.log("didn't work")
                        state.teacher = false;
                    }
                }

                state.accessToken = accessTokenString
            }

        })
        builder.addCase(getUserAttributes.fulfilled, (state, action) => {
            state.name = action.payload.name
            state.nickname = action.payload.nickname
            state.email = action.payload.email
            state.cognito_username = action.payload.sub
            console.log("user attributes are", action.payload)
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