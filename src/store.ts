import { configureStore } from "@reduxjs/toolkit/src/configureStore";
import userReducer from "./slice/userSlice/userSlice";
import settingsSlice from "./slice/settingsSlice/settingsSlice";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsSlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "settings"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    thunk,
  ],
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
