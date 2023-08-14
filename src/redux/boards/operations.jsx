import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllBoards = createAsyncThunk(
  'boards/getAllBoards',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/api/boards');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getActiveBoard = createAsyncThunk(
  'boards/getActiveBoard',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/boards/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (data, thunkAPI) => {
    try {
      await axios.post('/api/boards', data);
      thunkAPI.dispatch(getAllBoards());
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, data }, thunkAPI) => {
    try {
      await axios.put(`/api/boards/${id}`, data);
      thunkAPI.dispatch(getAllBoards());
      thunkAPI.dispatch(getActiveBoard(id));

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/boards/${id}`);
      thunkAPI.dispatch(getAllBoards());
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  'boards/addColumn',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post('/api/columns', data);
      thunkAPI.dispatch(getActiveBoard(res.data.board));
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateColumn = createAsyncThunk(
  'boards/updateColumn',
  async ([id, data], thunkAPI) => {
    try {
      const res = await axios.put(`/api/columns/${id}`, data);
      thunkAPI.dispatch(getActiveBoard(res.data.board));
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'boards/deleteColumn',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/columns/${id}`);
      thunkAPI.dispatch(getActiveBoard(res.data.data.board));
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'boards/addTask',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post('/api/tasks', data);
      thunkAPI.dispatch(getActiveBoard(res.data.board));
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'boards/updateTask',
  async ({id, data}, thunkAPI) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, data);
      thunkAPI.dispatch(getActiveBoard(res.data.board));
      return;
    } catch (error) {
      console.log (error.response.data.message)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'boards/deleteTask',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      thunkAPI.dispatch(getActiveBoard(res.data.data.board));
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const transferTask = createAsyncThunk(
  'boards/transferTask',
  ({ id, data }, thunkAPI) => {
    try {
      axios.patch(`/api/tasks/${id}/transfer`, data);
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    };
  }
);

export const transferColumn = createAsyncThunk(
  'boards/transferColumn',
  async ({ id, data }, thunkAPI) => {
    try {
      axios.patch(`/api/columns/${id}/transfer`, data);
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    };
  }
);