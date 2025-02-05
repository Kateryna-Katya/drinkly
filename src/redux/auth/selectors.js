export const selectAuthLoading = (state) => state.auth.loading;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectUserToken = (state) => state.auth.token;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUserName = (state) => state.auth.user.name;
export const selectIsAuthenticated = (state) =>
  state.auth.isLoggedIn && !state.auth.isRefreshing;
