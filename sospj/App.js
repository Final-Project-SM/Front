import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './navigator/MainTabNavigator';
import StartStackNavigator from './navigator/StartStackNavigator';
import {UserProvider} from './components/public/UserContext';
import axios from 'axios';
import LoadingScreen from './screens/LoadingScreen';
import {getFcmToken} from './util/function/fcmToken';
function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   // 데이터 로딩이나 필요한 초기 설정을 시뮬레이션합니다.
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // 3초 후 로딩 상태 변경
  //   getFcmToken();
  // }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  return (
    <UserProvider>
      <NavigationContainer>
        <StartStackNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
