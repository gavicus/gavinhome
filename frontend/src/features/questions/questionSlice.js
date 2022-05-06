import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import questionService from './questionService'

const initialState = {
  questions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getQuestions = createAsyncThunk('questions/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await questionService.getQuestions(token)
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getOneQuestion = createAsyncThunk(
  'questions/getOne',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await questionService.getOneQuestion(id, token)
    } catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createQuestion = createAsyncThunk(
  "questions/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await questionService.createQuestion(data, token);
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
);

export const deleteQuestion = createAsyncThunk(
  "questions/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await questionService.deleteQuestion(id, token);
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
);

export const updateQuestion = createAsyncThunk(
  "questions/update",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await questionService.updateQuestion(data, token);
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
);

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions = action.payload
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOneQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOneQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions = [action.payload]
      })
      .addCase(getOneQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions.push(action.payload)
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions = state.questions.filter(
          (question) => question._id !== action.payload.id
        )
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateQuestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        state.questions = state.questions.filter(
          (question) => question._id !== action.payload._id
        )
        state.questions.push(action.payload)
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = questionSlice.actions
export default questionSlice.reducer

