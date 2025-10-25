import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

// Persist to AsyncStorage on changes
const STORAGE_KEY = "TODOS_v1";
let prev = store.getState().todos;
store.subscribe(() => {
  const current = store.getState().todos;
  if (current !== prev) {
    prev = current;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(current)).catch((e) =>
      console.warn("Save todos failed", e)
    );
  }
});

export default store;

