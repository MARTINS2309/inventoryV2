import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    userName: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.id = action.payload.id,
      state.userName = action.payload.userName;
    },
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
