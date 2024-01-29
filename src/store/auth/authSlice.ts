import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import type { RootState } from  '../store';

interface AuthState {
  loggedIn: boolean
  teacher: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  loggedIn: false,
  teacher: false

}
const SignUp = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {


    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer