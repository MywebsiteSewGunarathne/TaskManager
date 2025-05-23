import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import { TASK_API_URL_SLASH } from "../constant";

//fetch
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(TASK_API_URL_SLASH);
  return response.data;
});

//fetch data by ID
export const fetchTasksById = createAsyncThunk('tasks/fetchTasksById', async (id) => {
  const response = await axios.get(`${TASK_API_URL_SLASH}${id}`);

  return response.data;
});

//delete
export const deleteTask = createAsyncThunk('task/deleteTask', async (id) => {
  await axios.delete(`${TASK_API_URL_SLASH}${id}`);
  return id;
});

//create
export const createTask = createAsyncThunk('task/createTask', async (taskData) => {
  const response = await axios.post(TASK_API_URL_SLASH, taskData);
  return response.data;
});

//edit
export const editTask = createAsyncThunk('task/editTask', async ({ id, taskData }) => {
  const response = await axios.put(`${TASK_API_URL_SLASH}${id}`, taskData);
  return response.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    selectedTask: null,
    status: 'idle',
    error: null,
    loadingTaskId: null

  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //fetch task by Id
      .addCase(fetchTasksById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasksById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedTask = action.payload;
      })
      .addCase(fetchTasksById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // deleteTask
      .addCase(deleteTask.pending, (state, action) => {
        state.loadingTaskId = action.meta.arg;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        state.loadingTaskId = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.loadingTaskId = null;
      })
      // createTask handlers
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //editTask
      .addCase(editTask.pending, (state, action) => {
        state.loadingTaskId = action.meta.arg.id;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loadingTaskId = null;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loadingTaskId = null;
      })

  },
});

export const { } = taskSlice.actions;
export default taskSlice.reducer;