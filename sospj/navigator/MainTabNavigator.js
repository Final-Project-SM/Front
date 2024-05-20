import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import MapScreen from '../screens/MapScreen';
import HomeStackNavigator from './HomeStackNavigator';
import SettingStackNavigator from './SettingStackNavigator';
import EditEmergencyContacts from '../screens/setting/EditEmergencyContacts';
// 추가하고 싶은 다른 스크린을 import합니다.

const Tab = createBottomTabNavigator();

/**
 * 메인 탭 내비게이터 컴포넌트
 * @returns {JSX.Element} MainTabNavigator 컴포넌트
 */
function MainTabNavigator() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E8F5E9',
        tabBarActiveBackgroundColor: '#E8F5E9',
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor: 'white',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/images/phoneTab.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/images/mapIcon.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingStackNavigator"
        component={SettingStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/images/mypage.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EditEmergencyContacts"
        component={EditEmergencyContacts}
        options={{headerShown: false, tabBarButton: () => null}}
      />
      {/* tabBarButton을 null로 설정하여 탭 버튼 숨김 */}
      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
