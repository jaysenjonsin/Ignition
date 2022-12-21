import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, thunkAPI) => {
    try {
      //this is protected route, we need to get token, which we can get using thunkAPI.getState().<stateName>
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (err) {
      const message =
        //  axios error response || backend response || error to string
        err.response?.data?.message || err.message || err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//need to get the goals to see them on our screen
export const getTasks = createAsyncThunk(
  'tasks/getAll',
  //we aren't sending any user input back, only getting. but we still need to send token since this is authorized route
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTasks(token);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/update',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.updateTask(id, token);
    } catch (err) {
      const message =
        (err.response && err.response.data & err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id, thunkAPI) => {
    try {
      //this route is protected, so we need to get our token. We can do this using thunkAPI getState method, which allows us to get our state. so we can get our auth state, which contains a user, which contains our token.
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.deleteTask(id, token);
    } catch (err) {
      const message =
        (err.response && err.response.data & err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //payload will contain all goals we receive
        state.tasks = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //UPDATING TASK TO UPDATE UI RIGHT AWAY
        const updatedTask = action.payload;
        //remember in backend, we send back an object with key of id, not ._id: {id: task.id}. So we access this with action.payload.id, NOT action.payload._id. 
        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask.id ? updatedTask : task
        );
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //this is taking out our deleted task from the UI right away. if we didnt filter it, we would have to reload to see the update. so we filter it out directly once the deletetask is fulfilled!!
      //remember the payload.id is the id of the task we delete. we got that from our server!! look at the response.
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter((el) => el._id !== action.payload.id);
      });
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;
