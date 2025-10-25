import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/todosSlice';

export default function TodoDetailsScreen({ route, navigation }) {
  const { id } = route.params || {};
  const { getById, toggleTodo, deleteTodo } = useContext(TodosContext);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const todo = todos.find((t) => t.id === id);

  if (!todo) return <View style={styles.container}><Text>Todo not found</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      {todo.description ? <Text style={styles.desc}>{todo.description}</Text> : null}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => { dispatch(toggleTodo(id)); navigation.goBack(); }} style={styles.btn}>
          <Text style={styles.btnText}>{todo.completed ? 'Undo' : 'Mark complete'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { dispatch(deleteTodo(id)); navigation.goBack(); }} style={[styles.btn, styles.del]}>
          <Text style={[styles.btnText, { color: '#fff' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  desc: { color: '#666', marginBottom: 14 },
  row: { flexDirection: 'row' },
  btn: { padding: 12, backgroundColor: '#eee', borderRadius: 8, marginRight: 8 },
  btnText: { fontWeight: '600' },
  del: { backgroundColor: '#ff4d4f' },
});