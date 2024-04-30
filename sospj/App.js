import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './navigator/MainTabNavigator';
import StartStackNavigator from './navigator/StartStackNavigator';
import messaging from '@react-native-firebase/messaging';
import {UserProvider} from "./components/public/UserContext"
import axios from 'axios';
//import messaging from '@react-native-firebase/messaging';
function App() {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log("fcm Token",fcmToken);
  }

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

// test - junsoo