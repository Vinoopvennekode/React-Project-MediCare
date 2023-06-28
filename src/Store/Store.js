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
import { DoctorLoginSlice } from "./Slice/DoctorLogin";
import { userBlockSlice } from "./Slice/UserBlock";

const persistConfig = { key: "root", storage, version: 1 };
const persistConfiguser = { key: "user", storage, version: 1 };
const persistConfigdoctor = { key: "doctor", storage, version: 1 };
const persistConfiguserBlock = { key: "block", storage, version: 1 };

const userLoginPersistedReducer = persistReducer(
  persistConfiguser,
  userLoginSlice.reducer
);

const AdminLoginPersisteReducer = persistReducer(
  persistConfig,
  AdminLoginSlice.reducer
);

const DoctorLoginPersistReducer = persistReducer(
  persistConfigdoctor,
  DoctorLoginSlice.reducer
);
const userBlockPersistReducer = persistReducer(
  persistConfiguserBlock,
  userBlockSlice.reducer
);

export const store = configureStore({
  reducer: {
    userLogin: userLoginPersistedReducer,
    adminLogin: AdminLoginPersisteReducer,
    doctorLogin: DoctorLoginPersistReducer,
    userBlock: userBlockPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
