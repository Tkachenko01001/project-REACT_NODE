export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectIsUpdating = state => state.auth.isUpdating;

export const selectIsLoading = state => state.auth.isLoading;

export const selectIsOpenModal = state => state.auth.isOpenModal;

export const selectTheme = state => state.auth.user.theme;
