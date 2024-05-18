import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage} from '../util/function/asyncStorage';
import messaging from '@react-native-firebase/messaging';
import {useUser} from '../components/public/UserContext';
import PermissionUtil, {
  APP_PERMISSION_CODE,
} from '../util/permission/PermissionUtil';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Sound from 'react-native-sound';

import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import styles from '../styleFolder/StartScreenStyles'; // 새로운 스타일 파일 가져오기

/**
 * 시작 화면 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} StartScreen 컴포넌트
 */

function StartScreen({navigation}) {
  const {user, setUser} = useUser();

  /**
   * 저장된 사용자 데이터를 읽어와 설정하는 함수
   */
  const readData = async () => {
    const jsonString = await getStorage('user');
    if (jsonString) {
      const data = JSON.parse(jsonString);
      setUser({id: data.id, name: data.name, password: data.password});
      navigation.navigate('Main');
    }
  };

  const playSound = () => {
    const sound = new Sound(
      require('../assets/video/becareful2.m4a'),
      error => {
        if (error) {
          console.log('Failed to load', error);
          return;
        }
        console.log('Sound loaded successfully');
        sound.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          sound.release(); // Release the sound instance to free up resources
        });

        setTimeout(() => {
          sound.stop(() => {
            console.log('Sound stopped');
            sound.release(); // Release the sound instance to free up resources
          });
        }, 3000); // 3초 후에 소리 재생 중지
      },
    );
  };

  useEffect(() => {
    PermissionUtil.cmmReqPermis([...APP_PERMISSION_CODE.android]);
    readData();
    messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      setTimeout(() => {
        navigation.navigate('Sos', {type: remoteMessage.data.type});
      }, 1000);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(remoteMessage);
      playSound();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/earth.png')}
        style={styles.logo}
      />
      <Text style={styles.appName}>MakeWorldSafely</Text>
      <Text style={styles.slogan}>세상을 조금은 더 안전하게</Text>
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

export default StartScreen;
