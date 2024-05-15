/*
  NFC 태그시 사용자 음성 녹음하는 screen 
  작업자 : 소대현 
  기능: 
    1. 음성녹음 10초 간 진행  
    2. 음성녹음파일을 flask 서버로 전송 
      2-2 결과값이 "정상" 혹은 "위급으로" 나옴 
*/
import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, ActivityIndicator} from 'react-native';
import axios from 'axios';
import AudioRecorderPlayer, {
  AudioSourceAndroidType,
  OutputFormatAndroidType,
  AudioEncoderAndroidType,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import {AI_PATH} from '@env';
import {useUser} from '../components/public/UserContext';
import {useIsFocused} from '@react-navigation/native';
import styles from '../styleFolder/SosScreenStyles'; // 새로운 스타일 파일 가져오기

const audioRecorderPlayer = new AudioRecorderPlayer();
const audioPath = RNFS.CachesDirectoryPath + '/audio.wav';

SosScreen = ({navigation}) => {
  const {user} = useUser();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const startrecord = async () => {
    try {
      const audioSet = {
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        OutputFormatAndroid: OutputFormatAndroidType.DEFAULT,
        AudioEncoderAndroid: AudioEncoderAndroidType.DEFAULT,
      };
      setLoading(true);
      const result = await audioRecorderPlayer.startRecorder(null, audioSet);
      console.log(result);
      setTimeout(async () => {
        const result2 = await audioRecorderPlayer.stopRecorder();

        audioRecorderPlayer.removeRecordBackListener();
        console.log('Recording stopped after 10 seconds');
        console.log(result2);
        const formData = new FormData();

        formData.append('file', {
          uri: result2,
          name: 'audio4',
          type: 'audio/aac',
        });
        // formData.append('file',result2)
        formData.append('id', user.id);
        console.log('axios');
        // setLoading(false)
        console.log('1');
        const response = await axios.post(
          'http://43.202.64.160:5000/predict',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
      }, 10000); // 10초를 밀리초로 변환하여 전달
      setTimeout(() => {
        navigation.navigate('Main');
      }, 11000);
    } catch (error) {
      console.error('Failed to start recording: ', error);
      navigation.navigate('Main');
    }
  };
  useEffect(() => {
    if (isFocused) {
      startrecord();
    }
  }, [isFocused]);

  /**
   * 테스트 함수로, 메인 화면으로 이동
   */
  const test = async () => {
    await navigation.navigate('Main');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/telephone.png')} // gif 이미지 경로
          style={styles.image}
        />
        <Text style={styles.loadingText}>음성 녹음 중...</Text>
        <ActivityIndicator
          size="large"
          color="#ff4d4f"
          style={styles.spinner}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text> 음성 녹음 끝 </Text>
      <Button title="로그인" onPress={test} />
    </View>
  );
};

export default SosScreen;
