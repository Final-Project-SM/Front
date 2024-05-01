import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './navigator/MainTabNavigator';
import StartStackNavigator from './navigator/StartStackNavigator';
import {UserProvider} from "./components/public/UserContext"
import axios from 'axios';
import { getFcmToken } from './util/function/fcmToken';
function App() {

  useEffect(()=>{
    getFcmToken()
  },[])
  return (
    <UserProvider>
      <NavigationContainer>
        <StartStackNavigator/>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;

