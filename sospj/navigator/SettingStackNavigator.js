import React from 'react';
import {Button, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MypageScreen from '../screens/MypageScreen';
import Setting from '../screens/setting/Setting';
import EditEmergencyContacts from '../screens/setting/EditEmergencyContacts';
import VoiceData from '../screens/setting/VoiceData';
import ReportHistory from '../screens/setting/ReportHistory';
import CaseStore from '../screens/setting/CaseStore';
import EditProfile from '../screens/setting/EditProfile';
// 추가하고 싶은 다른 스크린을 import합니다.

const Stack = createStackNavigator();

function SettingStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MypageScreen">
      <Stack.Screen
        name="MypageScreen"
        component={MypageScreen}
        options={({navigation}) => ({
          // navigation 매개변수 추가
          title: 'My',
          headerTitleAlign: 'center', // 타이틀을 중앙으로 정렬
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#81C784', // 헤더의 텍스트 및 버튼 색상
          headerTitleStyle: {
            // 타이틀 텍스트의 스타일
            fontSize: 20,
            fontFamily: 'SpoqaHanSansNeo-Bold',
          },
          headerLeft: null, // 뒤로 가기 버튼 제거
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <Image
                style={{width: 25, height: 25, marginRight: 15}}
                source={require('../assets/images/setting.png')}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EditEmergencyContacts"
        component={EditEmergencyContacts}
      />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="VoiceData" component={VoiceData} />
      <Stack.Screen name="ReportHistory" component={ReportHistory} />
      <Stack.Screen name="CaseStore" component={CaseStore} />
      <Stack.Screen name="EditProfile" component={EditProfile} />

      {/* 여기에 다른 탭 스크린을 추가할 수 있습니다. */}
    </Stack.Navigator>
  );
}

export default SettingStackNavigator;
