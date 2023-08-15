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
  transferColumn,
} from './operations';

const initialState = {
  boardsList: [],
  activeBoard: {},
  isLoading: false,
  error: null,
  filter: 'show all'
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
    setFilter(state, action) {
      state.filter = action.payload;
    },
    dellActive(state, action) {
      state.activeBoard = action.payload;
    }
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
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.activeBoard = {};  
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
        const columns = [...state.activeBoard.columns];

        const sourceColumnIndex = columns.findIndex((el) => el._id === action.payload.source.droppableId);
        const destinationColumnIndex = columns.findIndex((el) => el._id === action.payload.destination.droppableId);

        const droppedOrderUser = columns[sourceColumnIndex].taskOrder[action.payload.source.index];
        const droppedUserIndex = columns[sourceColumnIndex].tasks.findIndex((el) => el._id === droppedOrderUser);
        const droppedUser = columns[sourceColumnIndex].tasks[droppedUserIndex];

        columns[sourceColumnIndex].tasks.splice(droppedUserIndex, 1);
        columns[destinationColumnIndex].tasks.push(droppedUser);

        columns[sourceColumnIndex].taskOrder.splice(action.payload.source.index, 1);
        columns[destinationColumnIndex].taskOrder.splice(action.payload.destination.index, 0, droppedOrderUser)

        state.activeBoard.columns = columns;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(transferTask.rejected, handleRejected)
      .addCase(transferColumn.pending, handlePending)
      .addCase(transferColumn.fulfilled, (state, action) => {
        const columnOrder = [...state.activeBoard.columnOrder];

        const droppedColumn = columnOrder[action.payload.source.index];
        columnOrder.splice(action.payload.source.index, 1);
        columnOrder.splice(action.payload.destination.index, 0, droppedColumn);

        state.activeBoard.columnOrder = columnOrder;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(transferColumn.rejected, handleRejected);
  },
});

export const { clearError, setFilter, dellActive } = boardsSlice.actions;

export default boardsSlice.reducer;
