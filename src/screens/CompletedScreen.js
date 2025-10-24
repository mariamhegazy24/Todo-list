import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TodosContext } from '../context/TodosContext';

export default function CompletedScreen({ navigation }) {
  const { todos, toggleTodo, deleteTodo } = useContext(TodosContext);
  const completed = todos.filter(t => t.completed);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Details', { id: item.id })}>
        <Text style={styles.title}>{item.title}</Text>
        {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleTodo(item.id)} style={styles.btn}><Text>Undo</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)} style={[styles.btn, styles.del]}><Text style={{color:'#fff'}}>Delete</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed</Text>
      <FlatList data={completed} keyExtractor={i => i.id} renderItem={renderItem} ListEmptyComponent={<Text style={{textAlign:'center', marginTop:20}}>No completed todos</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  header: { fontSize:22, fontWeight:'700', textAlign:'center', marginBottom:12 },
  item: { flexDirection:'row', alignItems:'center', backgroundColor:'#fafafa', padding:12, borderRadius:8, marginBottom:8 },
  title: { fontWeight:'600' },
  desc: { color:'#666', marginTop:4 },
  actions: { flexDirection:'row' },
  btn: { padding:8, backgroundColor:'#eee', borderRadius:6, marginLeft:6 },
  del: { backgroundColor:'#ff4d4f' },
});