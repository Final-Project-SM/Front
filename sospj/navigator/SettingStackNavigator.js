import React from 'react';
import {Button, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MypageScreen from '../screens/MypageScreen';
import Setting from '../screens/Setting';
import EditEmergencyContacts from '../screens/setting/EditEmergencyContacts';
import VoiceData from '../screens/setting/VoiceData';
import CaseStore from '../screens/setting/CaseStore';
import EditProfile from '../screens/setting/EditProfile';
import ContactList from '../screens/setting/ContactList';
import HiddenKeywordSet from '../screens/HiddenKeywordSet';
import MyPathScreen from '../screens/MyPathScreen';
import WhoRegister from '../screens/WhoRegister';
// 추가하고 싶은 다른 스크린을 import합니다.

const Stack = createStackNavigator();

/**
 * 설정 스택 내비게이터 컴포넌트
 * @returns {JSX.Element} SettingStackNavigator 컴포넌트
 */
function SettingStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MypageScreen">
      <Stack.Screen
        name="MypageScreen"
        component={MypageScreen}
        options={({navigation}) => ({
          // navigation 매개변수 추가
          title: 'MY',
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
        options={{
          title: '비상연락망 수정',
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
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          title: '설정',
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
      <Stack.Screen
        name="VoiceData"
        component={VoiceData}
        options={{
          title: '신고데이터 확인',
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
      <Stack.Screen
        name="CaseStore"
        component={CaseStore}
        options={{
          title: '케이스 구매',
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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: '프로필 변경하기',
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
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{
          title: 'TEST',
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
      <Stack.Screen
        name="MyPathScreen"
        component={MyPathScreen}
        options={{
          title: '동선 확인하기',
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
      <Stack.Screen
        name="Keyword"
        component={HiddenKeywordSet}
        options={{
          title: '키워드 변경',
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
      <Stack.Screen
        name="WhoRegister"
        component={WhoRegister}
        options={{
          title: '나를 등록한 사람들',
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

export default SettingStackNavigator;
