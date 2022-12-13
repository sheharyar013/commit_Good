import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slices/walletSlice";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
