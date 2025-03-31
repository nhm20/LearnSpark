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

const userState = {
  user: null,
  isAuthenticated: false,
};

const transactions = [];

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
  },
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState: transactions,
  reducers: {
    addTransaction(state, action) {
      state.push(action.payload);
    },
  },
});

// Persist Configuration for User Slice
const userPersistConfig = {
  key: "user",
  storage,
};

// Creating Persisted Reducer
const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

// Configure Store with Middleware Fix
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    transactions: transactionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignores Persist Actions
      },
    }),
});

export const persistor = persistStore(store);

export default store;
export const { setUser, logoutUser } = userSlice.actions;
export const { addTransaction } = transactionSlice.actions;
