import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TODOS_v1';

export const loadTodos = createAsyncThunk('todos/load', async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Load todos failed', e);
    return [];
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare(title, description = '') {
        return {
          payload: {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: Date.now(),
          },
        };
      },
    },
    toggleTodo(state, action) {
      const t = state.find((s) => s.id === action.payload);
      if (t) t.completed = !t.completed;
    },
    deleteTodo(state, action) {
      return state.filter((s) => s.id !== action.payload);
    },
    setTodos(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addTodo, toggleTodo, deleteTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;