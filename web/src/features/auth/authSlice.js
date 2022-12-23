import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import avatar from '../../images/avatar.png';
//get user from local storage --> note: local storage stores strings, so we have to parse it. we set our user in localStorage in authService
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  avatar: avatar,
};

//REGISTER USER USING REGISTER FROM SERVICE FILE
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      //this is our action.payload. for axios it is found in response.data
      return await authService.register(user);
    } catch (err) {
      const message =
        //this is where we find axios error message:
        //err.response.data.message
        //err.message is the error thrown in backend
        err.response?.data?.message || err.message || err.toString();
      //rejectWithValue: method on thunkAPI that sends error message as payload.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (err) {
    //error messages are coming from userController!!!
    const message =
      err.response?.data?.message || err.message || err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return await authService.logout;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  //main reducers
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = false;
    },
  },
  //asyncThunk returns a promise so it has following states: pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //payload comes from thunkAPI.rejectWithValue
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

//export actions, reducer
export const { reset } = authSlice.actions;
export default authSlice.reducer;
