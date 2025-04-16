import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

// ------------------ User Slice ------------------
const userState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      console.log("User state updated:", state.user);
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateOnline: (state, action) => {
      if (state.user) {
        state.user.online = action.payload;
      }
    },
  },
});

// ------------------ Transaction Slice ------------------
const transactionSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    addTransaction(state, action) {
      state.push(action.payload);
    },
  },
});

// ------------------ Persist Config ------------------
const userPersistConfig = {
  key: "user",
  storage,
};

// Persisted reducer for user
const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

// ------------------ Store Configuration ------------------
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    transactions: transactionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// ------------------ Exports ------------------
export default store;
export const { setUser, logoutUser, updateOnline } = userSlice.actions;
export const { addTransaction } = transactionSlice.actions;
