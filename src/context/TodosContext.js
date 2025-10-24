import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TODOS_v1';
export const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setTodos(JSON.parse(raw));
      } catch (e) { console.warn('Load todos failed', e); }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (e) { console.warn('Save todos failed', e); }
    })();
  }, [todos]);

  const addTodo = (title, description = '') => {
    const newTodo = { id: Date.now().toString(), title: title.trim(), description: description.trim(), completed: false, createdAt: Date.now() };
    setTodos(prev => [newTodo, ...prev]);
    return newTodo;
  };

  const deleteTodo = id => setTodos(prev => prev.filter(t => t.id !== id));
  const toggleTodo = id => setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const getById = id => todos.find(t => t.id === id);

  return <TodosContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodo, getById }}>{children}</TodosContext.Provider>;
}