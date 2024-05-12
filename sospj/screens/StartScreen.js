import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage} from '../util/function/asyncStorage';
import messaging from '@react-native-firebase/messaging';
import {useUser} from '../components/public/UserContext';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
/**
 * 애플리케이션의 시작 화면을 나타내는 컴포넌트입니다. 사용자에게 회원가입 및 로그인을 할 수 있는 옵션을 제공합니다.
 *
 * @param {Object} props - 컴포넌트에 전달된 props
 * @param {Object} props.navigation - 네비게이션 객체, 화면 이동에 사용됩니다.
 */
import PermissionUtil, {
  APP_PERMISSION_CODE,
} from '../util/permission/PermissionUtil';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
function StartScreen({navigation}) {
  const {user, setUser} = useUser();
  const readData = async () => {
    const jsonString = await getStorage('user');
    if (jsonString) {
      const data = JSON.parse(jsonString);
      setUser({id: data.id, name: data.name, password:data.password});
      navigation.navigate('Main');
    }
  };
  useEffect(() => {
    PermissionUtil.cmmReqPermis([...APP_PERMISSION_CODE.android]);
    messaging().onMessage(async remoteMessage => {
      navigation.navigate('Sos');
    });
    messaging().setBackgroundMessageHandler(async remoteMessage=>{
      console.log("1")
 
    })
    readData();
  }, []);
  return (
    <View style={styles.container}>
      {/* Centered Logo */}
      <Image
        source={require('../assets/images/earth.png')}
        style={styles.logo}
      />

      {/* App Name */}
      <Text style={styles.appName}>MakeWorldSafely</Text>

      {/* Slogan */}
      <Text style={styles.slogan}>세상을 조금은 더 안전하게</Text>

      {/* Buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.primaryButtonText}>회원가입</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.secondaryButtonText}>아이디로 로그인하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    padding: 20,
    backgroundColor: '#E8F5E9', // Light green background
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#388E3C', // Dark green
    marginBottom: 10,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  slogan: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666', // Gray color for the slogan
    marginBottom: 20,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#388E3C', // Dark green button
    width: '70%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#ffffff', // White text
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#388E3C', // Dark green border
    borderWidth: 2,
    width: '70%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#388E3C',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
});

export default StartScreen;
