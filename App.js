import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Platform, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

import { Provider } from 'react-redux';
import { store } from './src/store';
import { loadTodos } from './src/store/todosSlice';

export default function App() {
  useEffect(() => {
    store.dispatch(loadTodos());
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safe}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 25 : 0 },
});
