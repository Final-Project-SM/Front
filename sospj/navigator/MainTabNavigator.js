import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import HomeStackNavigator from './HomeStackNavigator';
import SettingStackNavigator from './SettingStackNavigator';
import MapScreen2 from '../screens/MapScreen2';
// 추가하고 싶은 다른 스크린을 import합니다.

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#E8F5E9', tabBarActiveBackgroundColor:'#E8F5E9', tabBarShowLabel: false,tabBarInactiveBackgroundColor :'white' }}>
      <Tab.Screen name="Home" component={HomeStackNavigator}
       options={{ headerShown: false, tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={require('../assets/images/telephone.png')} // 이미지 경로를 설정하세요
          style={{ width: size, height: size}}
        />
      ),}}/>
      <Tab.Screen name="Map" component={MapScreen}
      options={{headerShown: false, tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={require('../assets/images/mapIcon.png')} // 이미지 경로를 설정하세요
          style={{ width: size, height: size}}
        />
      ),}} />
      {/* <Tab.Screen name="Map2" component={MapScreen2}
      options={{ headerShown: false, tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={require('../assets/images/mapIcon.png')} // 이미지 경로를 설정하세요
          style={{ width: size, height: size}}
        />
      ),}} /> */}
      <Tab.Screen name="SettingStackNavigator" component={SettingStackNavigator} options={{ headerShown: false, tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={require('../assets/images/setting.png')} // 이미지 경로를 설정하세요
          style={{ width: size, height: size}}
        />
      ),}}/>

      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
