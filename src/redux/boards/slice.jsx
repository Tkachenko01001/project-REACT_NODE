import { createSlice } from '@reduxjs/toolkit';
import {
  getAllBoards,
  getActiveBoard,
  addBoard,
  updateBoard,
  deleteBoard,
  addColumn,
  updateColumn,
  deleteColumn,
  addTask,
  updateTask,
  deleteTask,
  transferTask,
} from './operations';

const initialState = {
  boardsList: [],
  activeBoard: {},
  isLoading: false,
  error: null,
};

const handlePending = (state, action) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const boardsSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.boardsList = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getActiveBoard.fulfilled, (state, action) => {
        state.activeBoard = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllBoards.pending, handlePending)
      .addCase(getAllBoards.rejected, handleRejected)
      .addCase(getActiveBoard.pending, handlePending)
      .addCase(getActiveBoard.rejected, handleRejected)
      .addCase(addBoard.pending, handlePending)
      .addCase(addBoard.rejected, handleRejected)
      .addCase(updateBoard.pending, handlePending)
      .addCase(updateBoard.rejected, handleRejected)
      .addCase(deleteBoard.pending, handlePending)
      .addCase(deleteBoard.rejected, handleRejected)
      .addCase(addColumn.pending, handlePending)
      .addCase(addColumn.rejected, handleRejected)
      .addCase(updateColumn.pending, handlePending)
      .addCase(updateColumn.rejected, handleRejected)
      .addCase(deleteColumn.pending, handlePending)
      .addCase(deleteColumn.rejected, handleRejected)
      .addCase(addTask.pending, handlePending)
      .addCase(addTask.rejected, handleRejected)
      .addCase(updateTask.pending, handlePending)
      .addCase(updateTask.rejected, handleRejected)
      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.rejected, handleRejected)
      .addCase(transferTask.pending, handlePending)
      .addCase(transferTask.fulfilled, (state, action) => {
        state.activeBoard = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(transferTask.rejected, handleRejected);
  },
});

export const { clearError } = boardsSlice.actions;

export default boardsSlice.reducer;
