import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/todosSlice';

export default function CompletedScreen({ navigation }) {
  const todos = useSelector((state) => state.todos || []);
  const dispatch = useDispatch();
  const completed = todos.filter((t) => t && t.completed);

  useEffect(() => {
    console.log('CompletedScreen todos count:', todos.length, 'completed:', completed.length);
  }, [todos]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Details', { id: item.id })}>
        <Text style={styles.title}>{item.title}</Text>
        {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))} style={styles.btn}>
          <Text>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))} style={[styles.btn, styles.del]}>
          <Text style={{ color: '#fff' }}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!Array.isArray(todos)) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Completed</Text>
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>Todos state is not an array</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed</Text>
      <FlatList
        data={completed}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No completed todos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', padding: 12, borderRadius: 8, marginBottom: 8 },
  title: { fontWeight: '600' },
  desc: { color: '#666', marginTop: 4 },
  actions: { flexDirection: 'row' },
  btn: { padding: 8, backgroundColor: '#eee', borderRadius: 6, marginLeft: 6 },
  del: { backgroundColor: '#ff4d4f' },
});