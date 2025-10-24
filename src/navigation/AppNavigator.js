import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CompletedScreen from '../screens/CompletedScreen';
import TodoDetailsScreen from '../screens/TodoDetailsScreen';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: Platform.OS === 'ios' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}

function CompletedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: Platform.OS === 'ios' }}>
      <Stack.Screen name="Completed" component={CompletedScreen} />
      <Stack.Screen name="Details" component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} /> }} />
      <Tab.Screen name="CompletedTab" component={CompletedStack} options={{ tabBarLabel: 'Completed', tabBarIcon: ({ color, size }) => <FontAwesome name="check" color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}