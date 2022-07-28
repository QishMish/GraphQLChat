import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      appApi.endpoints.signUpUser.matchFulfilled,
      (state, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.signInUser.matchFulfilled,
      (state, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.logOutUser.matchFulfilled,
      state => null
    );
    builder.addMatcher(
      appApi.endpoints.logOutUser.matchFulfilled,
      state => null
    );
    builder.addMatcher(
      appApi.endpoints.fetchLoggedUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
    // builder.addMatcher(
    //   appApi.endpoints.retrieveUsers.matchFulfilled,
    //   (state, { payload }) => payload
    // );
  },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
