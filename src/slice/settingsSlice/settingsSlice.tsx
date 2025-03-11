import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../resetAction";

interface SettingsState {
  appNavbar: boolean;
}
const initialState: SettingsState = {
  appNavbar: true
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleAppNavbar: (state) => {
      state.appNavbar = !state.appNavbar;
    },
    resetSettings: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);
  },
});

export const {
  toggleAppNavbar,
  resetSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
