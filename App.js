
import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

import { Platform, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { TodosProvider } from './src/context/TodosContext';

export default function App() {
  return (
    <TodosProvider>
      <SafeAreaView style={styles.safe}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </TodosProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 25 : 0 },
});
