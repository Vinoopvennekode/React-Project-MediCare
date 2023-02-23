import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AdminLoginSlice } from "./Slice/AdminLogin";
import { userLoginSlice } from "./Slice/UserLogin";
import { DocterLoginSlice } from "./Slice/DocterLogin";

const persistConfig = { key: "root", storage, version: 1 };
const persistConfiguser = { key: "user", storage, version: 1 };



const userLoginPersistedReducer = persistReducer(
  persistConfiguser,
  userLoginSlice.reducer
);

const AdminLoginPersisteReducer = persistReducer(
  persistConfig,
  AdminLoginSlice.reducer
);

const DocterLoginPersistReducer = persistReducer(
  persistConfig,
  DocterLoginSlice.reducer
);

export const store = configureStore({
  reducer: {
    userLogin: userLoginPersistedReducer,
    adminLogin: AdminLoginPersisteReducer,
    docterLogin: DocterLoginPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor= persistStore(store)
