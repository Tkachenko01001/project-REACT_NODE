import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addTask = createAsyncThunk(
  'tasks/newTaskAdd',
  async (task, thunkAPI) => {
    try {
      const response = await axios.post('/api/tasks', task);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
