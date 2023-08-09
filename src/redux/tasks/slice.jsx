import { createSlice } from '@reduxjs/toolkit';
import { addTask, updateTask, deleteTask } from './operations';

const initialState = {
  task: {
    title: null,
    description: null,
    priority: null,
    deadline: null,
    column: null,
  },
  isLoading: false,
};

const addTaskPending = (state, action) => {
  state.isLoading = true;
};

const addTaskFulfilled = (state, action) => {
  state.task = action.payload;
  state.isLoading = false;
};

const addTaskRejected = (state, action) => {
  state.isLoading = false;
};

const updateTaskPending = (state, action) => {
  state.isLoading = true;
};

const updateTaskFulfilled = (state, action) => {
  state.task = action.payload;
  state.isLoading = false;
};

const updateTaskRejected = (state, action) => {
  state.isLoading = false;
};

const deleteTaskPending = (state, action) => {
  state.isLoading = true;
};

const deleteTaskFulfilled = (state, action) => {
  state.task = action.payload;
  state.isLoading = false;
};

const deleteTaskRejected = (state, action) => {
  state.isLoading = false;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: builder => {
    builder.addCase(addTask.pending, addTaskPending);
    builder.addCase(addTask.fulfilled, addTaskFulfilled);
    builder.addCase(addTask.rejected, addTaskRejected);
    builder.addCase(updateTask.pending, updateTaskPending);
    builder.addCase(updateTask.fulfilled, updateTaskFulfilled);
    builder.addCase(updateTask.rejected, updateTaskRejected);
    builder.addCase(deleteTask.pending, deleteTaskPending);
    builder.addCase(deleteTask.fulfilled, deleteTaskFulfilled);
    builder.addCase(deleteTask.rejected, deleteTaskRejected);
  },
});
export const tasksReducer = tasksSlice.reducer;
