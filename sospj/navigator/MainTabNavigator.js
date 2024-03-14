import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import HomeStackNavigator from './HomeStackNavigator';
import SettingStackNavigator from './SettingStackNavigator';
// 추가하고 싶은 다른 스크린을 import합니다.

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false  }}/>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Setting" component={SettingStackNavigator} options={{ headerShown: false  }} />

      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
