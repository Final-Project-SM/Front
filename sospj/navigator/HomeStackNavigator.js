import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import loginPageScreen from '../screens/loginPageScreen';
import RegisterPageScreen from '../screens/RegisterPageScreen';
// 추가하고 싶은 다른 스크린을 import합니다.

const Stack = createStackNavigator();

/**
 * 홈 스택 내비게이터 컴포넌트
 * @returns {JSX.Element} HomeStackNavigator 컴포넌트
 */
function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          title: 'Make World Safely',
          headerLeft: null, // 뒤로 가기 버튼 제거
          headerTitleAlign: 'center', // 타이틀을 중앙으로 정렬
          headerStyle: {
            backgroundColor: 'white',
          },
          // Header의 텍스트, 버튼 색상
          headerTintColor: '#81C784',
          // 타이틀 텍스트의 스타일
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'SpoqaHanSansNeo-Bold',
          },
        }}
      />

      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
