import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../store/todosSlice';

export default function HomeScreen({ navigation }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const onSubmit = () => {
    if (!title.trim()) return;
    dispatch(addTodo(title, description));
    setTitle('');
    setDescription('');
  };

  const filtered = todos.filter((t) =>
    filter === 'active' ? !t.completed : filter === 'completed' ? t.completed : true
  );

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate('Details', { id: item.id })}>
        <Text style={[styles.title, item.completed && styles.completed]}>{item.title}</Text>
        {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))} style={styles.smallBtn}>
          <Text style={styles.smallBtnText}>{item.completed ? 'Undo' : 'Done'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))} style={[styles.smallBtn, styles.delBtn]}>
          <Text style={styles.smallBtnText}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO APP</Text>

      <TextInput placeholder="Title (required)" placeholderTextColor="#666" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Description (optional)" placeholderTextColor="#666" style={[styles.input, styles.descInput]} value={description} onChangeText={setDescription} multiline />

      <TouchableOpacity style={styles.submit} onPress={onSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.filters}>
        <TouchableOpacity onPress={() => setFilter('all')} style={[styles.tab, filter === 'all' && styles.tabActive]}><Text style={filter === 'all' ? styles.tabTextActive : styles.tabText}>All</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('active')} style={[styles.tab, filter === 'active' && styles.tabActive]}><Text style={filter === 'active' ? styles.tabTextActive : styles.tabText}>Active</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')} style={[styles.tab, filter === 'completed' && styles.tabActive]}><Text style={filter === 'completed' ? styles.tabTextActive : styles.tabText}>Completed</Text></TouchableOpacity>
      </View>

      <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={renderItem} contentContainerStyle={{ paddingTop: 10 }} ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>No todos</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
    input: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 8, marginBottom: 10 },
    descInput: { height: 80, textAlignVertical: 'top' },
    submit: { backgroundColor: '#111', padding: 12, borderRadius: 8, alignItems: 'center', alignSelf: 'center', width: 140, marginBottom: 12 },
    submitText: { color: '#fff', fontWeight: '600' },
    filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
    tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#eee' },
    tabActive: { backgroundColor: '#111' },
    tabText: { color: '#333', fontWeight: '600' },
    tabTextActive: { color: '#fff', fontWeight: '600' },
    todoItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fafafa', borderRadius: 8, marginBottom: 8 },
    textContainer: { flex: 1 },
    title: { fontSize: 16, fontWeight: '600' },
    desc: { fontSize: 13, color: '#666', marginTop: 4 },
    completed: { textDecorationLine: 'line-through', color: '#999' },
    actions: { flexDirection: 'row' },
    smallBtn: { paddingVertical: 6, paddingHorizontal: 8, backgroundColor: '#ddd', borderRadius: 6, marginLeft: 6 },
    smallBtnText: { fontWeight: '600' },
    delBtn: { backgroundColor: '#ff4d4f' },
});