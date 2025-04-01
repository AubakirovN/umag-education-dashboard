import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../resetAction";
import { User } from "@/core/types";

interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: {
    id: '',
    name: '',
    phone: '',
    email: '',
    role: '',
    created_at: '',
    updated_at: ''
  }
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
