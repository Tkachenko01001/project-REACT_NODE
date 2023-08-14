export const selectIsBoardsLoading = state => state.boards.isLoading;

export const selectBoardsError = state => state.boards.error;

export const selectBoardsList = state => state.boards.boardsList;

export const selectActiveBoard = state => state.boards.activeBoard;

export const selectFilter = state => state.boards.filter;
