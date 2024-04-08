import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import loginPageScreen from '../screens/loginPageScreen';
import RegisterPageScreen from '../screens/RegisterPageScreen';
// 추가하고 싶은 다른 스크린을 import합니다.

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Make World Safely',
      headerStyle: { 
        backgroundColor: 'white',
      },
      // Header의 텍스트, 버튼 색상
      headerTintColor: '#81C784',
      // 타이틀 텍스트의 스타일
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }, }} />

      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
      </Stack.Navigator>

  );
}

export default HomeStackNavigator;
