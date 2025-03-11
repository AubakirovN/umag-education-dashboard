import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../resetAction";

interface UserState {
  currentUser: string;
}

const initialState: UserState = {
  currentUser: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
