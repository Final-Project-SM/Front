import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import loginPageScreen from '../screens/loginPageScreen';
import RegisterPageScreen from '../screens/RegisterPageScreen';
import StartScreen from '../screens/StartScreen';
import SosScreen from '../screens/SosScreen';
import MainTabNavigator from './MainTabNavigator';
// 추가하고 싶은 다른 스크린을 import합니다.

const Stack = createStackNavigator();

function StartStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'home' }} />
        <Stack.Screen name="Login" component={loginPageScreen} options={{ headerShown: false, tabBarStyle:{display:'none'}}} />
        <Stack.Screen name="Register" component={RegisterPageScreen} options={{ headerShown: false, tabBarStyle:{display:'none'}}} />
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false, tabBarStyle:{display:'none'}}} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false, tabBarStyle:{display:'none'}}} />
        <Stack.Screen name="Sos" component={SosScreen} options={{ headerShown: false, tabBarStyle:{display:'none'}}} />
      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
      </Stack.Navigator>

  );
}

export default StartStackNavigator;
