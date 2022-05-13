import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import scoreService from './scoreService'

const initialState = {
  scores: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createScore = createAsyncThunk(
  "score/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await scoreService.createScore(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.scores.push(action.payload)
      })
      .addCase(createScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = scoreSlice.actions
export default scoreSlice.reducer
