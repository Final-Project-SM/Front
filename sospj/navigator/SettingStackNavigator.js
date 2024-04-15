import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import EditEmergencyContacts from '../screens/setting/EditEmergencyContacts';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
// 추가하고 싶은 다른 스크린을 import합니다.

const Stack = createStackNavigator();

function SettingStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Setting">
        <Stack.Screen name="Setting" component={SettingsScreen} />
        <Stack.Screen name="EditEmergencyContacts" component={EditEmergencyContacts} />

      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
      </Stack.Navigator>

  );
}

export default SettingStackNavigator;
