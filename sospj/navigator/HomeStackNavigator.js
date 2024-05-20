import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import loginPageScreen from '../screens/loginPageScreen';
import RegisterPageScreen from '../screens/RegisterPageScreen';
import help from '../screens/HelpS';
// 추가하고 싶은 다른 스크린을 import합니다.

const Stack = createStackNavigator();

function HomeStackNavigator({route}) {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Home2">
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
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('help')}>
              <Image
                style={{width: 25, height: 25, marginRight: 15}}
                source={require('../assets/images/help.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="help"
        component={help}
        options={{
          title: '도움말',
          headerTitleAlign: 'center', // 타이틀을 중앙으로 정렬
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#81C784',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontFamily: 'SpoqaHanSansNeo-Bold',
    color: '#333',
  },
});

export default HomeStackNavigator;
