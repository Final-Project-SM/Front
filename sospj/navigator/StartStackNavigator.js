import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import loginPageScreen from '../screens/loginPageScreen';
import RegisterPageScreen from '../screens/RegisterPageScreen';
import StartScreen from '../screens/StartScreen';
import SosScreen from '../screens/SosScreen';
import MainTabNavigator from './MainTabNavigator';
import RegisterNumber from '../screens/RegisterNumber';
import StartingHelpScreen from '../screens/StartingHelpScreen';
import HiddenKeywordSet from '../screens/HiddenKeywordSet';
// 추가하고 싶은 다른 스크린을 import합니다.

const Stack = createStackNavigator();

/**
 * 시작 스택 내비게이터 컴포넌트
 *
 * 앱의 시작 화면과 관련된 여러 스크린을 포함하는 스택 네비게이터를 생성합니다.
 *
 * @component
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 네비게이션 객체
 * @returns {JSX.Element} StartStackNavigator 컴포넌트
 */
function StartStackNavigator({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'home'}}
      />
      <Stack.Screen
        name="Login"
        component={loginPageScreen}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPageScreen}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Sos"
        component={SosScreen}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="RegisterNumber"
        component={RegisterNumber}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="StartingHelp"
        component={StartingHelpScreen}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="HiddenKeyword"
        component={HiddenKeywordSet}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
    </Stack.Navigator>
  );
}

export default StartStackNavigator;
