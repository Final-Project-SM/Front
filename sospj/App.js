import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './navigator/MainTabNavigator';
import StartStackNavigator from './navigator/StartStackNavigator';
function App() {
  return (
    <NavigationContainer>
      <StartStackNavigator/>
    </NavigationContainer>
  );
}

export default App;

// test - junsoo